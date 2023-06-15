import GameChoices from "./GameResources/GameChoices";
import GameImage from "./GameResources/GameImage";
import GamePlayerInformation from "./GameResources/GamePlayerInformation";
import GameText from "./GameResources/GameText";
import "./Styles/GameScreen.css";


export default function GameScreen() {

    return(
        <>
            <div>
                <GameImage/>
                <GameText/>
                <GameChoices/>  
                <GamePlayerInformation/>
            </div>
            
        </>
    )
    
}