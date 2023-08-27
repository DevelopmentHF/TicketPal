import React, { Component } from "react";
import axios from "axios";

class YourBids extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketList: [],
            yourBids: [],
            userId: props.id,
        };
    }

    componentDidMount() {
        this.refreshList();
        this.intervalId = setInterval(this.refreshList, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({ userId: this.props.id }, () => {
                this.refreshList();
            });
        }
    }

    refreshList = () => {
        axios
            .get("http://localhost:8000/api/tickets/")
            .then((res) => {
                this.setState({ ticketList: res.data });
                this.updateYourBids();
            })
            .catch((err) => console.log(err));
    }

    updateYourBids = () => {
        const { userId, ticketList } = this.state;
        const yourBids = ticketList.filter((item) => item.bidders.includes(userId));
        this.setState({ yourBids });
    }

    renderItems = () => {
        return this.state.yourBids.map((item) => (
            <h1 key={item.id}>{item.name}</h1>
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
