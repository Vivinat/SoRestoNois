import PlayerBullets from "./PlayerBullets";
import PlayerHealth from "./PlayerHealth";

export default function GamePlayerInformation() {
        
    return(
        <>
            <section className="GameInformation">
                <PlayerBullets/>
                <PlayerHealth/>
                
            </section>
            
        </>
    )
}