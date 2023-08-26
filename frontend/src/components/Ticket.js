import React, { useState, useEffect, Component} from 'react';
import axios from "axios";
import Featured from "./Featured";

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
          ticketList: [],
        }
    };

    render() {
        return (
            <div>
                <button className="btn" onClick={()=>window.my_modal_3.showModal()}>open modal</button>
                <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg">{this.props.name}</h3>
                    <p className="py-4">{this.props.location}</p>
                </form>
                </dialog>
            </div>
        );
    }
};

export default Ticket;