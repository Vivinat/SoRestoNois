export default function Card() {
    return (
        <>
        <section class="hero-section">
                        <div class="card-grid">
                          <a id="LogButton" className="card" href="http://localhost:3000/public/game.html">
                            <div className="card__background" style="background-image: url(https://th.bing.com/th/id/OIG.5.g33uZBDYO4GlissDWY?pid=ImgGn)"></div>
                            <div className="card__content">
                              <p className="card__category"></p>
                              <h3 className="card__heading">Continuar</h3>
                            </div>
                          </a>
                          <a id="NewGameButton" className="card" href="http://localhost:3000/public/register.html">
                            <div className="card__background" style="background-image: url(https://th.bing.com/th/id/OIG.ZC2UKESEk4WKqD4JqCT5?pid=ImgGn)"></div>
                            <div className="card__content">
                              <p className="card__category"></p>
                              <h3 className="card__heading">Nova Conta</h3>
                            </div>
                          </a>
                          <a id="NewGameButton" className="card" href="#" onclick="resetUser()">
                            <div className="card__background" style="background-image: url(https://th.bing.com/th/id/OIG.ZC2UKESEk4WKqD4JqCT5?pid=ImgGn)"></div>
                            <div className="card__content">
                              <p className="card__category"></p>
                              <h3 className="card__heading">Novo Jogo</h3>
                            </div>
                          </a>
                           </div>
                      </section>
        </>
    )
}
