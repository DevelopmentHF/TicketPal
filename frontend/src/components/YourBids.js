import React, { Component } from "react";
import axios from "axios";

// makes the carousel for featured tickets
class YourBids extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketList: [],
            yourBids: [],
            userId: props.id,
            // isTicketShowing: false,
        }
    };

    /* this is grotty because its running every second */
    componentDidMount() {
        this.refreshList();
        // only way ive figured out how to refresh the list
        this.intervalId = setInterval(this.refreshList, 1000);
    };

    componentWillUnmount() {
        clearInterval(this.intervalId); // Clear interval when component unmounts
    }

    // get tickets from backend
    // TODO: MAKE THIS FUNCTION RUN WHEN WE CREATE A NEW TICKET
    refreshList = () => {
        console.log("refresh");
        axios
            .get("http://localhost:8000/api/tickets/")
            .then((res) => this.setState({ticketList: res.data}))
            .catch((err) => console.log(err));

        // go through the ticket list and remove all the ones not related to this persons id
        this.state.yourBids = [];
        this.state.ticketList.map((item) => {
            if (item.bidders.includes(this.state.userId)) {
                console.log("CurID: " + this.state.userId);
                console.log("bid match");
                this.state.yourBids.push(item);
            } else {
                console.log("no bid match");
                console.log("CurID: " + this.state.userId);
            }
        })
    }

    renderItems = () => {

        // Call the function every 1000 milliseconds (1 second)
        // const intervalId = setInterval(this.refreshList, 2000);

        const { viewCompleted } = this.state;
        const newTickets = this.state.ticketList;

        return this.state.yourBids.map((item) => (
            <h1>{item.name}</h1>
        ));
    };

    render() {
        return (
            <div>
                <div className="bg-base-200 p-6 rounded-xl">
                    <h1 className="font-bold text-2xl p-2">Tickets You've Bid On</h1>
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

export default YourBids;