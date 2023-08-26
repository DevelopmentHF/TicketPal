import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const Home = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            window.location.href = '/login';
        } else {
            (async () => {
                try {
                    const { data } = await axios.get(
                        'http://localhost:8000/home/',
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                            }
                        }
                    );

                    setMessage(data.message);
                } catch (e) {
                    console.log('not auth', e);
                }
            })();
        }
    }, []);

    return (
        <div className="form-signin mt-5 text-center">
            <h3>{message}</h3>
        </div>
    );
};
