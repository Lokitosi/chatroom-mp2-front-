import React, { useState, useContext } from 'react'
import { UserContext } from '../../UserContext';
import { Redirect } from 'react-router-dom';
const Login = () => {
    const { user, setUser } = useContext(UserContext);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const submitHandler = async e => {
        e.preventDefault();
        setEmailError('');
        setNameError('');
        setPasswordError('');
        console.log(name, email, password)
        try {
            const res = await fetch('https://chatroom-mp2-back-production.up.railway.app/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log(data)
            if (data.errors) {
                setEmailError(data.errors.email);
                setNameError(data.errors.name);
                setPasswordError(data.errors.password);

            }
            if (data.user) {
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (user) {
        return <Redirect to="/" />
    }
    return (

        <div className="row">
            <h2>Ingresar</h2>
            <form className="col s12" onSubmit={submitHandler}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className="email error red-text">{emailError}</div>
                        <label htmlFor="email">Correo Electrónico</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="password error red-text">{passwordError}</div>
                        <label htmlFor="password">Contraseña</label>
                    </div>
                </div>

                <button className="grey darken-4 btn-large">Ingresar</button>
            </form>
        </div>

    )
}

export default Login