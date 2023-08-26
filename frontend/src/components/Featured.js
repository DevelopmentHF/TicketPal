import React, { Component } from "react";
import axios from "axios";

// makes the carousel for featured tickets
class Featured extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketList: [],
        }
    }

    componentDidMount() {
        this.refreshList();
    };
    
    // get tickets from backend
    refreshList = () => {
    axios
        .get("/api/tickets/")
        .then((res) => this.setState({ticketList: res.data}))
        .catch((err) => console.log(err));
    }

    // render a carousel item for each ticket
    renderItems = () => {
        const { viewCompleted } = this.state;
        const newTickets = this.state.ticketList;
    
        
        return newTickets.map((item) => (
          <div className="carousel-item">
            {item.name} {item.location}
          </div>
        ));
    };
    
    render() {
        return (
            <div className="carousel carousel-center rounded-box">
                {this.renderItems()}
            </div>
        );
    }
}

export default Featured;