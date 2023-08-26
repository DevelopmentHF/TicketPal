import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Featured from "./Featured";
import {Navigation} from "./Navigations";

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
        <div className="flex justify-center items-center">
            <div className="text-center m-8 bg-base-200 rounded-2xl p-8">
                <h1 className="text-4xl font-bold">Featured</h1>
                <Featured></Featured>
            </div>
            {/*<div className="text-center m-8">*/}
            {/*    <h1>Tickets you're selling</h1>*/}
            {/*    <Featured></Featured> */}
            {/*</div>*/}
        </div>
    );
};
