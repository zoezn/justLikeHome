import React, {useContext, useState, useEffect} from "react";
import ListarCat from "../../components/categories/Categories";
import SearchBar from "../../components/Buscador/SearchBar";
import Listar from "../../components/List/List";
import {FilterProvider} from "../../components/FilterContext"
import {FilterContext} from "../../components/FilterContext"
import axios from "axios"

const Home = ()=>{
    const [productInfo, setProductInfo] = useState([]);  

    let url = "http://18.216.199.175:8080/api/";
    useEffect(() => {
      axios.get(url)
      .then(response => setProductInfo(response.data))
            
      .catch(error => console.log(error))
    }, [url])
      
  
    
  /*---------------  Es el fetch para traer productos por ciudades -------------*/

  const {filterData} = useContext(FilterContext)
  const [productsByCity, setProductsByCity]=useState([])

  const HandleSearchCity = ()=>{
    const getProductsByCity = async() => {

        const url = `http://18.216.199.175:8080/api/city/name/${encodeURIComponent(filterData.cityName)}`;
        const response = await axios.get(url);
        //console.log(result.data);
        setProductsByCity(response.data)
    }

    useEffect(() => {
        getProductsByCity()
    }, []);

  }

  /*----------------------------------------------------------------*/


  /*----------------- FETCH PARA FILTRAR POR CATEGORIAS --------
  const [productByCategory, setProductByCategory]=useState([])
  useEffect(()=>{
    if (filterData.category){
      const getProductsByCategory = async ()=>{
      const url = `http://localhost:8080/api/category/name/${filterData.category}`;
      const result = await axios.get(url);
    
      //console.log(result.data);
      setProductByCategory(result.data)
      }
      getProductsByCategory()
    }
  },[])


  productCategory={productByCategory}
  ------*/



  return(
    <FilterProvider>
      <div className="main">
        <SearchBar searchCity={HandleSearchCity}></SearchBar>
        <h1 className="category-title">Bienvenido a Just like Home</h1>
            
        <h2 className="category-title">Selecciona un tipo de alojamiento</h2>
        <ListarCat/>
        <h2 className="recommendation-h2">Recomendados</h2>
        <Listar products={productInfo} productCity={productsByCity} />
      </div>
    </FilterProvider>
  )
}

export default Home
