import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Greeting({dateTime}){
    const navigate = useNavigate();
    
     
    const [greet, setGreet] = useState("");
    const [bgColor, setBgColor] = useState("");

    useEffect(() => {
        const hour = dateTime.getHours()
        let greet;
        let color;

    if(hour >= 5 && hour < 12){
        greet = "Good Morning!! ☀️";
        color = '#FFE082';
    }else if (hour >= 12 && hour < 17){
        greet = "Good Afternoon!! ☀️";
        color = '#AED581';
    }else{
        greet = "Good Evening!! 🌙";
        color = '#FDB950';
    }
   
    setGreet(greet);
    setBgColor(color)
    document.body.style.backgroundColor = color;

    return () => {
      document.body.style.backgroundColor = '';  
    };
  }, [dateTime]);  


  const handleGoToTodo = () => {
    navigate('/Todo'); 
  };

    return(
        <div className="greeting-page" style = {{backgroundColor: bgColor}} >
            <h1 className="greetings">{greet}</h1>
            <button className="todo-page-button" onClick={handleGoToTodo}> Go to Tasks</button>
        </div>
        
    )
}
export default Greeting