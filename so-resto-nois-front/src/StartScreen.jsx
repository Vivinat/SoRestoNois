import axios from "axios";
import Card from "./StartResources/Card";
import "./Styles/Card.css";
import { useEffect } from "react";

export default function StartScreen() {

    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }

   useEffect(() => {
    axios.get('http://localhost:3000/', config)
            .then(res => res.json())
            .then(res => document.getElementById("api").innerHTML = res)
            .catch(err => console.log(err))
   }, [])
    

    return(
        <>
        <div id="api">teste</div>
        <Card />
        </>
    )
}