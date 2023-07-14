import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { async } from 'regenerator-runtime';

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

    // loadtext: async function() {
    //     const [text, setText] = useState([]);

    //     await axios.get('/api/text')
    //     .then((response) => {
    //         setText(response.data.text);
    //         console.log(response.data.text);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    //     return text;
    // },

    // loadchoice: async function() {
    //     const [choiceText, setChoiceText] = useState([]);

    //     axios.get('/api/choiceText')
    //     .then((response) => {
    //         setChoiceText(response.data.choiceText);
    //         console.log(response.data.choiceText);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    //     return choiceText;

    // },

    sendChoice: async function(choiceId) {
        const [response, setResponse] = useState([]);
        //const [narration, setNarration] = useState([]);


        console.log("Escolha selecionada abaixo:")
        console.log(choiceId);

          setResponse(axios.post('/makeChoice', {
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ choiceId })
          }));

          if (!response.ok) {
            console.error(`Failed to send choice: ${response.status} ${response.statusText}`);
          }

          //Fiz uma escolha. Quero ir para a proxima narração, que terá suas proprias escolhas

          const narrationResponse = await fetch('/api/text');
          const choiceTextResponse = await fetch('/api/choiceText');
          const choiceIdsResponse = await fetch('/api/choiceIds');

          if (narrationResponse.ok && choiceTextResponse.ok && choiceIdsResponse.ok) {
            const narrationData = await narrationResponse.json();
            const choiceTextData = await choiceTextResponse.json();
            const choiceIdsData = await choiceIdsResponse.json();

            const text = narrationData.text;
            const narration = document.querySelector('.narration');
            narration.innerHTML = `<h1>${text}</h1>`; //RETORNAR NOVA NARRAÇÃO

            const choiceText = choiceTextData.choiceText;
            const choiceIds = choiceIdsData.choicesId;
            const choiceButtons = document.querySelectorAll('.choicesContainer button');

            for (let i = 0; i < choiceText.length && i < choiceButtons.length; i++) {
              (function(index) {
              choiceButtons[index].textContent = choiceText[i];
              choiceButtons[index].style.display = 'block';
              choiceButtons[index].setAttribute('choice-id', choiceIds[i]);
              })(i);
            }

            for (let i = 0; i < choiceText.length && i < choiceButtons.length; i++) { 
                (function(index) {  //IIFF APLICAR NOS OUTROS FOR SE DER MERDA
                  choiceButtons[index].textContent = choiceText[index];
                  choiceButtons[index].style.display = 'block';
                  choiceButtons[index].setAttribute('choice-id', choiceIds[index]);
                  choiceButtons[index].addEventListener('click', function() {
                    sendChoice(choiceButtons[index].getAttribute('choice-id'));
                  });
                })(i);
            }

            for (let i = choiceText.length; i < choiceButtons.length; i++) {
              (function(index){
              choiceButtons[index].style.display = 'none';
              choiceButtons[index].setAttribute('choice-id', "");
            })(i);
          }
          } else {
            console.error(`Failed to fetch narration text or choice data.`);
          }
          updateBullets();
          updateHealth();
        
    },

};

export default funcoesjogo;