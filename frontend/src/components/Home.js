import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Featured from "./Featured";
import {Navigation} from "./Navigations";
import YourTickets from "./YourTickets";
import {YourBids} from "./YourBids";

export const Home = () => {
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(0);

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
                    setUserId(data.id);
                    console.log("SETTING USER ID: " + userId);
                } catch (e) {
                    console.log('not auth', e);
                }
            })();
        }
    }, []);

    return (
        <div className="flex-column justify-center items-center">
            <div className="text-center m-8 bg-base-200 rounded-2xl p-8">
                <h1 className="text-4xl font-bold">Featured</h1>
                <Featured></Featured>
            </div>
            <div className="flex">
                <div id="yourBids">
                    <YourBids></YourBids>
                </div>
                <div id="yourTickets">
                    <YourTickets id={userId}></YourTickets>
                </div>
            </div>
        </div>
    );
};
