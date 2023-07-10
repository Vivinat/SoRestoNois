import Register from "../Register";
import { Link, Navigate } from 'react-router-dom';

export default function Card(props) {

    async function novaConta() {
      console.log("teste")
      return Navigate('/Register')
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
          <a id="NewGameButton" class="card" href="#" onClick={novaConta}>
          <div class="card__background" style={{backgroundImage: 'url(https://th.bing.com/th/id/OIG.ZC2UKESEk4WKqD4JqCT5?pid=ImgGn)'}}></div>
          <div class="card__content">
          <p class="card__category"></p>
          <h3 class="card__heading">Nova Conta</h3>
          </div>
          </a>
          <a id="New" class="card" href="#" onClick="resetUser()">
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
