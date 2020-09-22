import React, { useState } from 'react';
import api from '../api/Api';

import './Login.css';

import logo from '../assets/logo.svg';

export default function Login({ history }) {

    const [ username, setUsername ] = useState('');

    async function handlerSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs', {
            username
        });

        const { _id } = response.data;

        console.log(username);

        history.push(`/devs/${_id}`);

    }

    return (
        <div className="login-container">
            
            <form onSubmit={handlerSubmit}>
                <img src={logo} alt=""/>
                <input 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Digite seu usuário GitHub"
                />
                <button>Entrar</button>
            </form>
        </div>
    );
}
