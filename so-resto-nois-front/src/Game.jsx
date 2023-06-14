export default function Game(){
    window.addEventListener('load', async () => {
        const response = await fetch('/text');
        if (response.ok) {
          const data = await response.json();
          const text = data.text;
          const narration = document.querySelector('.narration');
          narration.innerHTML = `<h1>${text}</h1>`;

          // Populate choice buttons
          const choiceTextResponse = await fetch('/choiceText');
          const choiceIdsResponse = await fetch('/choiceIds');

          if (choiceTextResponse.ok && choiceIdsResponse.ok) {
            const choiceTextData = await choiceTextResponse.json();
            const choiceIdsData = await choiceIdsResponse.json();
            const choiceText = choiceTextData.choiceText;
            const choiceIds = choiceIdsData.choicesId;
            const choiceButtons = document.querySelectorAll('.choicesContainer button');

            for (let i = 0; i < choiceText.length && i < choiceButtons.length; i++) {
              choiceButtons[i].textContent = choiceText[i];
              choiceButtons[i].setAttribute('choice-id', choiceIds[i]);
              choiceButtons[i].addEventListener('click', function() {
                sendChoice(choiceButtons[i].getAttribute('choice-id'));
              });
            }

            // Hide any unused buttons
            for (let i = choiceText.length; i < choiceButtons.length; i++) {
              choiceButtons[i].style.display = 'none';
            }
          } else {
            console.error(`Failed to fetch choice text or choice IDs.`);
          }
        } else {
          console.error(`Failed to fetch text: ${response.status} ${response.statusText}`);
        }
        updateBullets();
      });

      async function sendChoice(choiceId) {
        console.log("Escolha selecionada abaixo:")
        console.log(choiceId);

        const response = await fetch('/makeChoice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ choiceId })
        });

        if (!response.ok) {
          console.error(`Failed to send choice: ${response.status} ${response.statusText}`);
        }

        const narrationResponse = await fetch('/text');
        const choiceTextResponse = await fetch('/choiceText');
        const choiceIdsResponse = await fetch('/choiceIds');

        if (narrationResponse.ok && choiceTextResponse.ok && choiceIdsResponse.ok) {
          const narrationData = await narrationResponse.json();
          const choiceTextData = await choiceTextResponse.json();
          const choiceIdsData = await choiceIdsResponse.json();

          const text = narrationData.text;
          const narration = document.querySelector('.narration');
          narration.innerHTML = `<h1>${text}</h1>`;

          const choiceText = choiceTextData.choiceText;
          const choiceIds = choiceIdsData.choicesId;
          const choiceButtons = document.querySelectorAll('.choicesContainer button');

          for (let i = 0; i < choiceText.length && i < choiceButtons.length; i++) {
            choiceButtons[i].textContent = choiceText[i];
            choiceButtons[i].setAttribute('choice-id', choiceIds[i]);
          }

          for (let i = choiceText.length; i < choiceButtons.length; i++) {
            choiceButtons[i].style.display = 'none';
          }
        } else {
          console.error(`Failed to fetch narration text or choice data.`);
        }
        updateBullets();
      }

      function updateBullets() {
        fetch('/consultaBullets')
          .then(function(response) {
            if (!response.ok) {
              throw new Error('Ocorreu um erro ao consultar o banco de dados.');
            }
            return response.json();
          })
          .then(function(data) {
            var atributo = parseInt(data.currentBullets); // O valor retornado é uma string
            document.getElementById('UserBullets').textContent = atributo; // Atualiza o conteúdo do elemento com o atributo
          })
          .catch(function(error) {
            console.error(error);
          });
      };
    

    return (
        <>
        <div class="narration">
        <h1>teste</h1>
    </div>


    <div class="choicesContainer">

      <button id="choice1" choice-id=""></button>
      <button id="choice2" choice-id=""></button>
      <button id="choice3" choice-id=""></button>
      <button id="choice4" choice-id=""></button>
  
    </div>

    <div class="bulletsCounter">
      <p>Número de balas:<span id="UserBullets"></span></p>
    </div>
        </>
    )
}