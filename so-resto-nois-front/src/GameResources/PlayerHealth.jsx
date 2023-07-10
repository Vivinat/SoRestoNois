import { useEffect } from "react";
import axios, { AxiosHeaders } from "axios";

export default function PlayerHealth() {
    
    //const [currentHealth, setCurrentHealth] = useState([]);
    //const [totalHealth, setTotalHealth] = useState([]);


    

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

   let currentHealth = 3;
   let totalHealth = 5;

    return(
        <>
        <div className="health-bar" totalHealth = {totalHealth} currentHealth = {currentHealth}>
            <div className="bar">
                <div className="hit"></div>
            </div>
        </div>      
        </>

        // Agora falta adicionar uma função para receber atualizações do valor da vida do player
        
    )
}