import Register from "../Register";
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

export default function Card(props) {

    const [user, setUser] = useState([]);
    const [userId, setUserId] = useState([]);

    function resetUser(){
        axios.post('/api/resetUser', async (req, res) => {
          setUserId(req.cookies.userId);            
          if (!userId) {    //Se não acha o cookie, manda o cara se registrar
            return <Navigate to="/Register" />;
          }
          try{
            setUser(await findUser(client, userId));  //Ache o usuário
            if (!user) {  //Se não tiver achado, de este erro
              res.sendStatus(404);
              return;
            }

            
            const [filter, setFilter] = useState({ _id: new ObjectId(userId)});  //Vamos preparar para fazer o update
            const [bullets, setBullets] = useState([0]);
            const [progression, setProgression] = useState(['N1A']);
            const [health, setHealth] = useState([5]);

            const update = { $set: { 
              starterProgression: progression , 
              starterBullets: bullets,
              health: health} };

            const result = await client.db("PlayerStats").collection("_stats").updateOne(filter, update);
            if (result.modifiedCount === 0) {
              console.error(`Failed to update user ${userId}`);
              res.sendStatus(500);
              return;
            }
            console.log(`${userId} resetado com sucesso`);
            res.redirect('/api/');
            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }
      });
    }

    function novaConta (){
      console.log("Nova conta");
      return <Navigate to="Register" />;
    }

      return ( 
      <>
      
<section className="hero-section">
          <div className="card-grid">
          <a id="LogButton" class="card" href="#Game">
          <div class="card__background" style={{backgroundImage: 'url(https://th.bing.com/th/id/OIG.5.g33uZBDYO4GlissDWY?pid=ImgGn)'}}></div>
          <div class="card__content">
          <p class="card__category"></p>
          <h3 class="card__heading">Continuar</h3>
          </div>
          </a>
          <a id="NewGameButton" class="card" href="#" onClick={() => novaConta()}>
          <div class="card__background" style={{backgroundImage: 'url(https://th.bing.com/th/id/OIG.ZC2UKESEk4WKqD4JqCT5?pid=ImgGn)'}}></div>
          <div class="card__content">
          <p class="card__category"></p>
          <h3 class="card__heading">Nova Conta</h3>
          </div>
          </a>
          <a id="New" class="card" href="#" onClick={() => resetUser()}>
          <div class="card__background" style={{backgroundImage: 'url(https://th.bing.com/th/id/OIG.ZC2UKESEk4WKqD4JqCT5?pid=ImgGn)'}}></div>
          <div class="card__content">
          <p class="card__category"></p>
          <h3 class="card__heading">Novo Jogo</h3>
          </div>
          </a>
          </div>
          </section>
        </>
    )
}
