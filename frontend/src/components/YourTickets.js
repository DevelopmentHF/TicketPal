import React, { Component } from "react";
import axios from "axios";

class YourTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketList: [],
            yourTickets: [],
            userId: props.id,
        };
    }

    componentDidMount() {
        this.refreshList();
        this.intervalId = setInterval(this.refreshList, 1000);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({ userId: this.props.id }, () => {
                // Once the userId state is updated, refresh the list
                this.refreshList();
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    refreshList = () => {
        axios
            .get("http://localhost:8000/api/tickets/")
            .then((res) => {
                this.setState({ ticketList: res.data });
                this.updateYourTickets();
            })
            .catch((err) => console.log(err));
    }

    updateYourTickets = () => {
        const { userId, ticketList } = this.state;
        const yourTickets = ticketList.filter((item) => item.vendor === userId);
        this.setState({ yourTickets });
    }

    renderItems = () => {
        return this.state.yourTickets.map((item) => (
            <h1 key={item.id}>{item.name}</h1>
        ));
    };

    render() {
        return (
            <div>
                <div className="bg-base-200 p-6 rounded-xl">
                    <h1 className="font-bold text-2xl p-2">Your Tickets Currently on Auction</h1>
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

export default YourTickets;
