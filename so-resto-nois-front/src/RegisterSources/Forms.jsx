export default function Forms() {
    return (
    <>
    <h1>Cadastro de usuário</h1>
    <form action="http://localhost:3000/register" method="POST">
        <label> Nome:
            <input type="text" name="name" id="name-input"/>
        </label>
        <button type="submit">Enviar</button>
        </form>
        <footer><p>Utilizamos cookies para facilitar o armazenamento!</p></footer>
    </>
    )
}