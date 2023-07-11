import axios from "axios";
import Card from "./StartResources/Card";
import "./Styles/Card.css";
import { useEffect } from "react";
import Register from "./Register";
import { useState } from "react";

export default function StartScreen() {


    const [newName, setnewName] = useState([]);
    const [starterProgression, setStarterProgression] = useState([]);
    const [starterBullets, setStarterBullets] = useState([]);
    const [health, setHealth] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [achievementsList, setAchievementsList] = useState([]);

    useEffect(() => {
        getnewName();
    }, []);

    function getnewName() {
        axios.get('/api/')
        .then((response) => {
            setnewName(response.data[0].newName);
            setStarterProgression(response.data[0].starterProgression);
            setStarterBullets(response.data[0].starterBullets);
            setHealth(response.data[0].health);
            setAchievements(response.data[0].achievements);
            setAchievementsList(response.data[0].achievementsList);


            console.log(response.data[0].newName);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    

    return(
        <>
        <h1>Bem vindo, {newName}</h1>
        <p>Progresso: {starterProgression}</p>
        <p>Balas: {starterBullets}</p>
        <p>Vida: {health}</p>
        <Card />
        <p>Conquistas</p>
        <p>{achievements}</p>
        <ul>
            {achievementsList}
        </ul>
        </>
    )
}