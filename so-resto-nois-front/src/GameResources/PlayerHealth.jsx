import { useEffect } from "react";
import axios, { AxiosHeaders } from "axios";
import { useState } from "react";

export default function PlayerHealth() {
        
    const [currentHealth, setCurrentHealth] = useState([]);
    const [totalHealth, setTotalHealth] = useState([5]);



    

    useEffect(() => {
        axios.get('/api/updateHealth')
        .then((response) => {
            setCurrentHealth(response.data.currentHealth);
            console.log(response.data.currentHealth);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

   //a barra de vida em css ainda não está funcionando, mas o código está aqui

    return(
        <>
        <div className="health-bar" totalHealth = {totalHealth} currentHealth = {currentHealth}>
            <div className="bar">
                <div className="hit"></div>
                <p>Vida Atual: {currentHealth}/{totalHealth}</p>
            </div>
        </div>      
        </>
        
    )
}