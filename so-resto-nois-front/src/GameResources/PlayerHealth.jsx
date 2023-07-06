import { useEffect } from "react";
import axios from "axios";

export default function PlayerHealth() {
    
    useEffect(() => {
        axios.get('http://localhost:3000/updateHealth')
    }, []);


    let currentHealth = 5;
    let totalHealth = 5;
    
    return(
        <>
        <div class="health-bar" totalHealth = {totalHealth} currentHealth = {currentHealth}>
            <div class="bar">
                <div class="hit"></div>
            </div>
        </div>      
        </>

        // Agora falta adicionar uma função para receber atualizações do valor da vida do player
        
    )
}