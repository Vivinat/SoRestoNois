import React, { useState, useEffect } from 'react';
import axios from 'axios';
import updateinfo from "./Gamefunctions";

export default function PlayerBullets() {
    //const [balas, setBalas] = useState([]);

    // useEffect(() => {
    //     axios.get('/api/updateBullets')
    //     .then((response) => {
    //         setBalas(response.data.currentBullets);
    //         console.log(response.data.currentBullets);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }, []);

    
    return(
        <p>
            Número de balas: {updateinfo.updateBullets()}
        </p>
    )
}