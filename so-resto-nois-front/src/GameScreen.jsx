import GameChoices from "./GameResources/GameChoices";
import GameImage from "./GameResources/GameImage";
import GamePlayerInformation from "./GameResources/GamePlayerInformation";
import GameText from "./GameResources/GameText";
import "./Styles/GameScreen.css";
import axios from "axios";
import { useState } from "react";
import updateinfo from "./GameResources/Gamefunctions";


export default function GameScreen() {

    const [text, setText] = useState([]);
    const [choiceText, setChoiceText] = useState([]);

     window.addEventListener('load', async () => {
         await axios.get('/api/text')
         .then((response) => {
             setText(response.data.text);
             console.log(response.data.text);
         })
         .catch((error) => {
             console.log(error);
         });
         await axios.get('/api/choiceText')
         .then((response) => {
             setChoiceText(response.data.choiceText);
             console.log(response.data.choiceText);
         })
         .catch((error) => {
             console.log(error);
         });
     }, []);

    return(
        <>
            <div>
                
                <div className="GameArea">
                    <GameImage/>
                    <GameText texto={text}/>
                    <GameChoices quantidade={choiceText.length}  escolhas={choiceText}/>
                </div>
                <GamePlayerInformation/> 
            </div>   
                
            
            
        </>
    )
    
}