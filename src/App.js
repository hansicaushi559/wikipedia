import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios';
import search from './search.svg'



function App() {
  const [wikiData, setWikiData] = useState([])
  const [searchTerm, setSearchTerm] = useState ('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null);


  const getData = async () => {
    try {
      const data = await axios.get('https://en.wikipedia.org/w/api.php' ,{
        params: {
          origin: '*',
          action: 'opensearch',
          search: {searchTerm}
        }
      });
      setIsLoaded(true)
      setWikiData(data.data[3].slice(0 , 5))
    } catch (error) {
      setIsLoaded(true)
      setError(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  if (error) { return 
    <div>
      Error: {error.message}
    </div> } else if (!isLoaded) {
      return <div>Loading...</div>;
  } else {
    return (
      <div className="App" >
        <input
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={handleChange}
        />
        <img src={search}
          onClick={() => setWikiData(searchTerm)} />
        </div>
        );
  }


}

export default App;
