import GameChoice from "./GameChoice";
//import React, { useEffect, useState } from 'react';


export default function GameChoices(props) {
    //const [choices, setChoices] = useState([props.escolhas]); 
    //const [numberOfChoices, setNumberOfChoices] = useState([props.quantidade]); 
    let numberOfChoices = props.quantidade;
    let choices = [props.escolhas]

    //setNumberOfChoices(props.quantidade);
    //setChoices(props.escolhas);

    for (let index = 1; index < numberOfChoices; index++) {
        choices.push(<GameChoice escolha={props.escolhas[index]}/>);  
        //console.log(props.escolhas[index]); 
    }
    return(
        <>
            <section className="GameChoices">
                   <button>{choices}</button> 
            </section>
            
        </>
    )
}