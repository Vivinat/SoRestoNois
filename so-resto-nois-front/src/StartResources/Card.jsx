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



      return ( 
      <>
      
<section className="hero-section">
          <div className="card-grid">
          <Link to="GameScreen" id="LogButton" class="card">
          <div class="card__background" style={{backgroundImage: 'url(https://th.bing.com/th/id/OIG.5.g33uZBDYO4GlissDWY?pid=ImgGn)'}}></div>
          <div class="card__content">
          <p class="card__category"></p>
          <h3 class="card__heading">Continuar</h3>
          </div>
          </Link>
          <Link to="Register" id="NewGameButton" class="card">
          <div class="card__background" style={{backgroundImage: 'url(https://th.bing.com/th/id/OIG.ZC2UKESEk4WKqD4JqCT5?pid=ImgGn)'}}></div>
          <div class="card__content">
          <p class="card__category"></p>
          <h3 class="card__heading">Nova Conta</h3>
          </div>
          </Link>
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
