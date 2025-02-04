import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import RoomList from './RoomList';
import io from 'socket.io-client';
let socket;

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]);
    const ENDPT = 'https://chatroom-mp2-back-production.up.railway.app/';

    useEffect(() => {
        socket = io(ENDPT);
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPT])

    useEffect(() => {
        socket.on('output-rooms', rooms =>{
            setRooms(rooms)
        })
    }, [])

    useEffect(() => {
        socket.on('room-created', room => {
            setRooms([...rooms, room])
        })
    }, [rooms])

    useEffect(() => {
        console.log(rooms)
    }, [rooms])

    const handleSubmit = e => {
        e.preventDefault();
        socket.emit('create-room', room);
        console.log(room);
        setRoom('');

    }
    if (!user) {
        return <Redirect to='/login' />
    }
    return (
        <div>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey lighten-5">
                        <div className="card-content black-text">
                            <span className="card-title">Bienvenido {user ? user.name : ''}</span>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12 black-text">
                                        <input
                                            placeholder=""
                                            id="room" type="text" className="validate black-text"
                                            value={room}
                                            onChange={e => setRoom(e.target.value)}
                                        />
                                        <label htmlFor="room">Nombre de la sala</label>
                                    </div>
                                </div>
                                <button className="btn white black-text">Crear sala</button>
                            </form>
                        </div>
                        <div className="card-action">
                        </div>
                    </div>
                </div>
                <div className="col s6 m5 offset-1">
                    <RoomList rooms={rooms} />
                </div>
            </div>
        </div>
    )
}

export default Home