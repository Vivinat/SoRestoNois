import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const funcoesjogo = {
    updateBullets: function() {
        const [balas, setBalas] = useState([]);
        //useEffect(() => {
        axios.get('/api/updateBullets')
        .then((response) => {
            //setBalas(response.data.currentBullets);
            console.log(response.data.currentBullets);
            return response.data.currentBullets;
        })
        .catch((error) => {
            console.log(error);
        });
        //}, []);
        return balas;
        
    
    },

    updateHealth: function() {
        const [currentHealth, setCurrentHealth] = useState([]);
        //useEffect(() => {
        axios.get('/api/updateHealth')
        .then((response) => {
            setCurrentHealth(response.data.currentHealth);
            console.log(response.data.currentHealth);
            //return response.data.currentHealth;
        })
        .catch((error) => {
            console.log(error);
        });
        //}, []);
        return currentHealth;
    },
};

export default funcoesjogo;