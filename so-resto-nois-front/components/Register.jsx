import { DevTool } from '@hookform/devtools';
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, * as others from 'axios';
import { useState } from 'react';

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

        <form action="/register" method="POST" onSubmit={handleSubmit(submit)} noValidate>
<<<<<<< HEAD
                <label htmlFor="name-input" placeholder="usuário">Usuário</label>
                <input type="text" id="name-input" {...register('name-input')} />
                <p className='erro'>{errors.name-input?.message}</p>

                <button type="submit">Enviar</button>
=======
                <label htmlFor="username" placeholder="nome">Nome</label>
                <input type="text" id="name" {...register('username')} />
                <p className='erro'>{errors.username?.message}</p>

                <button>Submeter</button>
>>>>>>> 8e30cc6a94e9d7c25c76ff74ab09a7ee03c0d715
            </form>
            <DevTool control={control}/>
            <p>{msg}</p>


        <footer><p>Utilizamos cookies para facilitar o armazenamento!</p></footer>
        </>

    )
}