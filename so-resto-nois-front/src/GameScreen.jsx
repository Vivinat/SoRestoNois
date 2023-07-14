import GameChoices from "./GameResources/GameChoices";
import GameImage from "./GameResources/GameImage";
import GamePlayerInformation from "./GameResources/GamePlayerInformation";
import GameText from "./GameResources/GameText";
import "./Styles/GameScreen.css";
import axios from "axios";
import { useState } from "react";
import updateinfo from "./GameResources/Gamefunctions";
import { useEffect } from "react";


export default function GameScreen() {

    let [text, setText] = useState([]);
    let [choiceText, setChoiceText] = useState([]);
    let [choiceIdsResponse, setChoiceIdsResponse] = useState([]);

     window.addEventListener('load', async () => {
         const response = await axios.get('/api/text');
         if (response){
            console.log(response);
            //const data = await response.json();
            setText(response['data']['text']);

            setChoiceText = await axios.get('/api/choiceText');
            console.log(choiceText);
            setChoiceIdsResponse = await axios.get('/api/choiceIds');
            console.log(choiceIdsResponse);

            // if(choiceIdsResponse.ok && choiceText.ok){
            //     const choiceTextData = await choiceTextResponse.json();
            //     const choiceIdsData = await choiceIdsResponse.json();
            //     const choiceText = choiceTextData.choiceText;
            //     const choiceIds = choiceIdsData.choicesId;
            // }

         } else {
                console.log('Erro ao carregar texto:' + response.status);
         }
         updateinfo.updateBullets();
         updateinfo.updateHealth();
        
        // await axios.get('/api/text')
        //  .then((response) => {
        //      setText(response.data.text);
        //      console.log(response.data.text);
        //  })
        //  .catch((error) => {
        //      console.log(error);
        //  });
        //  await axios.get('/api/choiceText')
        //  .then((response) => {
        //      setChoiceText(response.data.choiceText);
        //      console.log(response.data.choiceText);
        //  })
        //  .catch((error) => {
        //      console.log(error);
        //  });
            updateinfo.updateBullets();
            updateinfo.updateHealth();
     }, []);

    return(
        <>
            <div>
                
                <div className="GameArea">
                    <GameImage/>
                    <GameText texto={text}/>
                    <GameChoices quantidade={choiceText.length}  escolhas={choiceText} id={choiceIdsResponse}/>
                </div>
                <GamePlayerInformation/> 
            </div>   
                
            
            
        </>
    )
    
}