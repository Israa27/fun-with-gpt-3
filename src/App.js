import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[search,setSearch]=useState('')
 
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/trending?api_key=OQryvtBkigFjXXNffPBf1I1AypAcpiNV`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData.data);
        setError(null);
      } catch(err) {
        setError(err.message);
        setData(null);
        
      }}
    getData()
  }, [data])

const handleSubmit=(event)=>{
 
    event.preventDefault()
    const getData = async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=OQryvtBkigFjXXNffPBf1I1AypAcpiNV`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData.data);
        setError(null);
      } catch(err) {
        setError(err.message);
        setData(null);
        
      }}
    getData()

}

  return (
    <div className="app">
      <div className='search-form'>
        <input value={search} onChange={(event)=>setSearch(event.target.value)} type='text' placeholder='Search....'/>
        <button onClick={handleSubmit} type='submit' className='btn-search'>search</button>
      </div>
     <div className='gif'>
       {data.map(index=>{
         return(
         <div className='single-img skeleton' key={index.id}>
           <img src={index.images.fixed_height.url} alt=''/>
         </div>
        );
      })}

       

     </div>
     
    </div>
  );
}

export default App;
