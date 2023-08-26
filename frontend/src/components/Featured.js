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
        .get("http://localhost:8000/api/tickets/")
        .then((res) => this.setState({ticketList: res.data}))
        .catch((err) => console.log(err));
    }

    // render a carousel item for each ticket
    renderItems = () => {
        const { viewCompleted } = this.state;
        const newTickets = this.state.ticketList;
    
        
        return newTickets.map((item) => (
          <div className="flex carousel-item h-full">
            <div className="card w-96 bg-white shadow-xl">
                <div className="card-body">
                    <p>{item.name} {item.location}</p>
                </div>
                
            </div>
          </div>
        ));
    };
    
    render() {
        return (
            <div className="carousel w-60 rounded-box">
                {this.renderItems()}
            </div>
        );
    }
}

export default Featured;