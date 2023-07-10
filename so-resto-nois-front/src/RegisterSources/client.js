const form = document.querySelector('#register-form');
    const nameInput = document.querySelector('#name-input');
    const logButton = document.getElementById('LogButton');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        //Aqui verifica o forms de registro.
        const name = nameInput.value;
        const bullets = 0;
        const progression = 'N1A';

    //Usuario se registrou. Mande para server.js fazer a conexão
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, bullets, progression })
        });

        const result = await response.json();

        console.log(result);

});