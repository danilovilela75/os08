import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../api/Api';

import './Devs.css';

import logo from '../assets/logo.svg';

import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Devs({ match }) {

    const [ users, setUsers ] = useState([]);

    useEffect(() => {

        async function loadUsers() {

            const response = await api.get('/devs', {
                headers: { user: match.params.id }
            });

            setUsers(response.data);

        }

        loadUsers();

    }, [match.params.id]);

    async function handleDislike(id) {
        const rDislike = await api.post(`/devs/${id}/dislikes`, null, { headers: { user: match.params.id } });
        console.log(rDislike);
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleLike(id) {
        const rLike = await api.post(`/devs/${id}/likes`, null, { headers: { user: match.params.id } });
        console.log(rLike);
        setUsers(users.filter(user => user._id !== id));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="tinDev"/>
            </Link>
            
            { users.length > 0 ?
            (
                <ul>
                {users.map(user => (

                    <li key={user._id}>
                        <img src={user.avatar}/>
                        <footer>
                            <strong>{user.name}</strong>
                            <p>
                                {user.bio}
                            </p>
                        </footer>
                        <div className="buttons">
                            <button type="button" onClick={() => handleDislike(user._id)}><img src={dislike} alt="Dislike"/></button>
                            <button type="button" onClick={() => handleLike(user._id)}><img src={like} alt="Like"/></button>
                        </div>
                    </li>

                ))}
                </ul>
            )
            : 
            (
                <div className="empty">
                    Acabou :(
                </div>
            )
            }

        </div>
    )
}
