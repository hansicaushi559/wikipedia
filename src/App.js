import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios';
import Link from './Link'




function App() {
  const [wikiData, setWikiData] = useState([])
  const [searchTerm, setSearchTerm] = useState ('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [title, setTitle] = useState([])
  

  const getData = async () => {
    try {
      const data = await axios.get('https://en.wikipedia.org/w/api.php' ,{
        params: {
          origin: '*',
          action: 'opensearch',
          search: searchTerm
        }
      });
      setIsLoaded(true)
      setWikiData(data.data[3].slice(0 , 5))
      setTitle(data.data[1].slice(0, 5))
      console.log(title)
    } catch (error) {
      setIsLoaded(true)
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [searchTerm])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  } 
  


  if (!isLoaded) {
    return ( 
      <div className="ring">Loading
        <span></span>
      </div>
    )} else {
      return(
      <div className="App" >
          <h1>Wikipedia Search</h1>
          <input
          type='text'
          placeholder=' Search ...'
          value={searchTerm}
          onChange={handleChange}/>
  {
    wikiData?.length > 1 && searchTerm.length > 3 ?
      (
        <div className='container'>
          {wikiData.map(data => (
            <Link data={data} />)
          )}
        </div>
      ) : (
        <div className='empty'>
          <h2>No Search Found</h2>
        </div>
        )
      }
    </div>
    )}
      
      
}
  export default App;
