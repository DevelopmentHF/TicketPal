import axios from "axios";
import { useState } from "react";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // New state for error message

    const submit = async e => {
        e.preventDefault();

        const user = {
            username: username,
            password: password
        };

        try {
            const { data } = await axios.post(
                'http://localhost:8000/token/',
                user,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
            window.location.href = '/';
        } catch (error) {
            setErrorMessage('Wrong username or password.');
        }
    }

    return (
        <div className="flex justify-center items-center p-24">
            <form className="Auth-form p-8 bg-base-200 rounded-xl" onSubmit={submit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title text-xl font-bold">Sign In</h3>
                    {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                    )}
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            className="form-control mt-1"
                            name='username'
                            type='text'
                            value={username}
                            required
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            name='password'
                            type="password"
                            className="form-control mt-1"
                            value={password}
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
