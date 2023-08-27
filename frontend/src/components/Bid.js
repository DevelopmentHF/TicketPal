import React, { useState, useEffect, Component} from 'react';
import axios from "axios";
import Featured from "./Featured";

class Bid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPriceInputOpen: false,
            curId: props.id,
            ticketList: [],
        };
    }

    refreshList = () => {
        console.log("refresh");
    axios
        .get("http://localhost:8000/api/tickets/")
        .then((res) => this.setState({ticketList: res.data}))
        .catch((err) => console.log(err));
    };

    openPriceInput = () => {
        this.setState({ isPriceInputOpen: true});
        console.log("open " + this.state.curId);
    };

    closePriceInput = () => {
        this.setState({ isPriceInputOpen: false});
    };

    enterBid = (event) => {
        const specificTicket = this.state.ticketList.find(obj => obj.id === this.curId);
        console.log(this.state.ticketList);
        const formData = new FormData(event.target);
        const bidPrice = parseInt(formData.get("curMaxBid"));
        if (bidPrice > specificTicket.curMaxBid) {
            console.log("BID!");
            try {
                const response = fetch(`http://localhost:8000/api/tickets/${this.state.curId}`, {
                    method: 'PUT', // or 'PATCH' depending on your API's requirements
                    body: formData,
                    headers: {
                        // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
        
                if (response.ok) {
                    // Handle success, maybe close the modal or show a success message
                    console.log("Ticket updated");
                    // handleClose();
                } else {
                    // Handle error, show an error message or take appropriate action
                    console.log("Update failed");
                }
            } catch (error) {
                console.error('Error updating ticket:', error);
            }
        } else {
            console.log("fuck");
        }
    }

    render() {
        return (
            <div>
                <button className="btn" onClick={this.openPriceInput}>Bid</button>
                { this.state.isPriceInputOpen && (
                    <div>
                        <form onSubmit={this.enterBid}>
                            <input type="text" name="curMaxBid" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs m-2" />
                            <button className="btn" type="submit">Enter</button>
                        </form>
                        
                    </div>
                )}
            </div>
        );
    }
};

export default Bid;