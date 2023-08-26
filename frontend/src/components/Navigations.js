import React, { useState, useEffect} from 'react';
import axios from "axios";
import Featured from "./Featured";

export function Navigation() {
    const [isAuth, setIsAuth] = useState(false);
    const [vendorId, setVendorId] = useState(0);

    // gets the vendor id from api
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
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

                    setVendorId(data.id);
                    console.log("VENDOR ID: " + vendorId);
                } catch (e) {
                    console.log('not auth', e);
                }
            })();
        }
    }, []);

    /* opens the selling modal when the button is clicked */
    const handleSellTicket = () => {
        window.my_modal_1.showModal();
    }

    /* */
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get the form data
        const formData = new FormData(event.target);

        // add the vendor field
        formData.append('vendor', vendorId);

        // Send the form data to your API to create a new ticket
        try {
            const response = await fetch('http://localhost:8000/api/tickets/', {
                method: 'POST',
                body: formData,
                headers: {
                    // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            if (response.ok) {
                // Handle success, maybe close the modal or show a success message
                console.log("Ticket made");

            } else {
                // Handle error, show an error message or take appropriate action
                console.log("no ticket");
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
        }

    }

    return (
    <div>
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a href="/">Homepage</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-xl">TicketPal</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <button className="btn btn-primary" onClick={handleSellTicket}>
                    Sell Your Ticket
                </button>
                <dialog id="my_modal_1" className="modal">
                    <form onSubmit={handleSubmit} className="modal-box">
                        <h3 className="font-bold text-lg">Event Details</h3>
                        <p className="py-4">Upload your ticket details here</p>
                        <div className="py-2">
                            <label className="form-label p-4">Event Name</label>
                            <input type="text" name="name" className="input input-bordered w-full max-w-xs" required />
                        </div>
                        <div className="py-2">
                            <label className="form-label p-4">Location</label>
                            <input type="text" name="location" className="input input-bordered w-full max-w-xs" required />
                        </div>
                        <div className="py-2">
                            <label className="form-label p-4">Date</label>
                            <input type="datetime-local" name="date" className="input input-bordered w-full max-w-xs" required />
                        </div>
                        <div className="py-2">
                            <label className="form-label p-4">Ph. Num</label>
                            <input type="text" name="phone" className="input input-bordered w-full max-w-xs" required />
                        </div>
                        {/* ... other form fields */}
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Create Listing</button>
                            <button className="btn" onClick={() => window.my_modal_1.close()}>Close</button>


                        </div>
                    </form>
                </dialog>
            </div>
        </div>
    </div>
);
}