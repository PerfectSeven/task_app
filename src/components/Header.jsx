import React, {useState, useEffect} from "react";
function Header(){
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const fullDateTime = dateTime.toLocaleString('en-US',{
    weekday: 'long',
    year: 'numeric',       
    month: 'long',        
    day: 'numeric',        
    hour: '2-digit',      
    minute: '2-digit',     
    second: '2-digit',     
    hour12: true,         
  
  });

 return(
        <header className="navbar">
            <nav >
                <p className="date">{fullDateTime}</p>
            </nav>
        </header>
    )

 
};

export default Header;






    

   



