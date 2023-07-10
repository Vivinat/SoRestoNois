import axios from "axios";
import Card from "./StartResources/Card";
import "./Styles/Card.css";
import { useEffect } from "react";
import Register from "./Register";

export default function StartScreen() {

    

    async function findUser(client, userId) {
        return client.db("PlayerStats").collection("_stats").findOne({ _id: new ObjectId(userId) });
    }

   useEffect(() => {
    axios.get('/api/', async (req, res) => {
        const userId = req.cookies.UserId;
        if (!userId){
            return <Register />
        }

        try{
            const user = await findUser(client, userId);
                let achievementsList = '';
                if (user) {
                  const achievements = user.achievements; // Obtenha o array de conquistas
                  // Crie uma string com os itens da lista de conquistas
                  achievementsList = achievements
                  .map(achievement => `<li><img src="${achievement}" alt="Achievement"></li>`)
                  .join('');  //QUEM FOR FAZER O CSS ACHA UM JEITO DE TIRAR O • DO <li>
              }
        }
        catch(err){
            console.log(err);
        }
    }
    )        
   }, [])
    

    return(
        <>
        <h1>Bem vindo, {user.newName}</h1>
        <Card />
        </>
    )
}