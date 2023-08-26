import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Featured from "./Featured";

export const Home = () => {
    const [message, setMessage] = useState('');

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
        <div className="text-center">
            <div className="form-signin mt-5 text-center">
                <h3>{message}</h3>
            </div>
            <div className="p-5">
                <h1 className="font-bold text-4xl p-4">Featured Tickets</h1>
                <Featured></Featured>
            </div>
        </div>
    );
};
