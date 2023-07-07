import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

export default function Register(){

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        console.log('dados enviados', data);
        console.log('erro', errors);
        axios.post('http://localhost:3000/register', data)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <>
        <h1>Cadastro de usuário</h1>

        <form onSubmit={handleSubmit(submit)} noValidate>
            <label htmlFor="name-input">Nome:</label>
            <input type="text" name="name" id="name-input" {...register('name-input')} />
            <p className='erro'>{errors.name?.message}</p>
            
            <button type="submit">Enviar</button>
        </form>

        {/*<form action="/register" method="POST">
        <label> Nome:
            <input type="text" name="name" id="name-input"/>
        </label>
        <button type="submit">Enviar</button>
        </form>*/}


        <footer><p>Utilizamos cookies para facilitar o armazenamento!</p></footer>
        </>

    )
}