import { useEffect } from "react";
import axios, { AxiosHeaders } from "axios";
import { useState } from "react";
import updateinfo from "./Gamefunctions";

export default function PlayerHealth() {
        
    
    const [totalHealth, setTotalHealth] = useState([5]);


    //setCurrentHealth(updateinfo.updateHealth());
    

     //useEffect(() => {
      //  setCurrentHealth(updateinfo.updateHealth());
    //     axios.get('/api/updateHealth')
    //     .then((response) => {
    //         setCurrentHealth(response.data.currentHealth);
    //         console.log(response.data.currentHealth);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
     //}, []);

   //a barra de vida em css ainda não está funcionando, mas o código está aqui

    return(
        <>
        <div className="health-bar" totalHealth = {totalHealth} currentHealth = {updateinfo.updateHealth()}>
            <div className="bar">
                <div className="hit"></div>
                <p>Vida Atual: {updateinfo.updateHealth()}/{totalHealth}</p>
            </div>
        </div>      
        </>
        
    )
}