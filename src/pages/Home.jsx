import React, {useState, useEffect} from 'react';
import Header from "../components/Header.jsx";
import Greeting from "../components/Greeting.jsx";

function Home(){
  
    const[dateTime, setDateTime] = useState(new Date());
    

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); 

    return () => clearInterval(timer); 
  }, []);


  

     return (
    <>
     <Header dateTime={dateTime} />
     <Greeting dateTime={dateTime} />
    </>
  );
  
}
export default Home