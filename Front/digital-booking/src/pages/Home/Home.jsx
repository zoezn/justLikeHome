import React from "react";

import ListarCat from "../../components/categories/Categories";
import axios from 'axios';

import List from "../../components/List/Lists";

import SearchBar from "../../components/Buscador/SearchBar";
import { useState, useEffect } from "react";
import Listar from "../../components/List/List";


const Home = ()=>{
    const [productInfo, setProductInfo] = useState([]);  

    let url = "http://13.58.154.135:8080/api/";
    useEffect(() => {
        axios.get(url)
            .then(response => setProductInfo(response.data/* .results */))
            
            .catch(error => console.log(error))
    }, [url])
      
    /* useEffect(async () => { 
        const result = await axios.get(
          'http://localhost:8080/api/',
           );
    
        setData({List: result.data});
      }, [] );  */
     
    return(
        <div className="main">
            <SearchBar></SearchBar>
            <h1 className="category-title">Bienvenido a Just like Home</h1>
            
            <h2 className="category-title">Selecciona un tipo de alojamiento</h2>
           <ListarCat/>
            <h2 className="recommendation-h2">Recomendados</h2>
            <Listar products={productInfo}/>
            <ul>
            
     {/*  {data && data.List.map(item => (
        <li key={item.ID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))} */}


    </ul>

        </div>
    )
}

export default Home