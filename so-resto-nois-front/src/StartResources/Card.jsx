import Register from "../Register";
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

export default function Card(props) {

    const [user, setUser] = useState([]);
    const [userId, setUserId] = useState([]);

    function resetUser(){
      axios.post('/api/resetUser')
        .then(response => {
          if (response.ok) {
            window.location.href = '/api/';
          } else {
            throw new Error('Ocorreu um erro ao consultar o banco de dados.');
          }
        })
        .catch(error => {
          console.error(error);
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
