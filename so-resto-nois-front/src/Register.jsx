export default function Register(){
    
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
    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bullets, progression })
    });

    const result = await response.json();

    console.log(result);

});
    
    return (
        <>
        <h1>Cadastro de usuário</h1>

        <form action="/register" method="POST">
        <label> Nome:
            <input type="text" name="name" id="name-input"/>
        </label>
        <button type="submit">Enviar</button>
        </form>


        <footer><p>Utilizamos cookies para facilitar o armazenamento!</p></footer>
        </>

    )
}