import { useEffect } from "react";
import axios, { AxiosHeaders } from "axios";

export default function PlayerHealth() {
    
    //const [currentHealth, setCurrentHealth] = useState(5);
    //const [totalHealth, setTotalHealth] = useState(5);


    useEffect(() => {
        axios.get('http://localhost:3000/updateHealth', {
            headers: {
                withCredentials: true,
                UserId:"64a77f8f0b0c2ea8528b480c",
                'Access-Control-Allow-Origin': '*',
                'Acess-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            },
        }
        )
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);


    let currentHealth = 5;
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