import "./App.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "./Link";

function App() {
  const [wikiData, setWikiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyResult, setIsEmptyResult] = useState(false);
  const debounceTimer = useRef(null);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          origin: "*",
          action: "opensearch",
          search: searchTerm,
        },
      });

      const dataSource = data.data[3].map((link, index) => {
        const titles_array = data.data[1];
        return {
          wiki_link: link,
          wiki_title: titles_array[index],
        };
      });
      setWikiData(dataSource.slice(0, 5));
      setIsEmptyResult(dataSource.length === 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (searchTerm.trim().length > 3) {
      debounceTimer.current = setTimeout(() => {
        getData();
      }, 1000);
    } else {
      setWikiData([]);
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <h1>Wikipedia Search</h1>

      <input
        type="text"
        placeholder=" Search ..."
        value={searchTerm}
        onChange={handleChange}
      />

      {isLoading && (
        <div className="ring">
          Loading
          <span></span>
        </div>
      )}

      <div className="container">
        {wikiData.map((data, index) => (
          <Link data={data} key={`${index}`} />
        ))}

        {isEmptyResult && (
          <div className="empty">
            <h2>No Search Found</h2>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
