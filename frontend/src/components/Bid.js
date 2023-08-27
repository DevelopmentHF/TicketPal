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

    enterBid = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        this.refreshList();
        const specificTicket = this.state.ticketList.find(obj => obj.id === this.state.curId); // Use this.state.curId
        const formData = new FormData(event.target);
        const bidPrice = parseInt(formData.get("curMaxBid"));

        if (bidPrice > specificTicket.curMaxBid) {
            console.log("BID!");

            try {
                const response = await fetch(`http://localhost:8000/api/tickets/${this.state.curId}`, {
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
            console.log("Bid price must be higher");
        }
    }

    testfunc =  (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        this.refreshList();
        const formData = new FormData(event.target);
        const bidPrice = parseInt(formData.get("curMaxBid"));
        console.log("TICKETS TICKETS TICKETS: ", this.state.ticketList);
        const tickets = this.state.ticketList;
        for (let i=0; i < tickets.length; i++) {
            console.log("HEFHUHEF: ", tickets[i]);
            console.log("TICKETID: ", tickets[i].id);
            if (this.state.curId === tickets[i].id) {
                const copy = tickets[i];
                copy.curMaxBid = bidPrice;
                try {
                    console.log("PUTPUPTUPUT");
                    axios.put(`http://localhost:8000/api/tickets/${this.state.curId}/`, copy
                    );

                    // // Assuming your API returns an updated ticket object, update the state with the new ticket
                    // const updatedTicket = response.data; // Adjust based on your API response format
                    // const ticketList = this.state.ticketList.map((ticket) =>
                    //     ticket.id === updatedTicket.id ? updatedTicket : ticket
                    // );
                    //
                    // this.setState({
                    //     ticketList,
                    //     curMaxBidInput: "", // Clear the input field after update
                    //     isPriceInputOpen: false, // Close the input form
                    // });
                } catch (error) {
                    // Handle error
                    console.error("Error updating ticket:", error);
                }
            }
        }
    }

    render() {
        return (
            <div>
                <button className="btn" onClick={this.openPriceInput}>Bid</button>
                { this.state.isPriceInputOpen && (
                    <div>
                        <form onSubmit={this.testfunc}>
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