import React, { Component } from "react";
import axios from "axios";

// makes the carousel for featured tickets
class Featured extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketList: [],
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
    }

    // called when specific ticket is clicked
    /*
    toggleShowTicket = () => {
        this.setState(prevState => ({
            isTicketShowing: !prevState.isTicketShowing,
        }));
            
    }
    */

    handleViewTicket = () => {
        window.my_modal_1.showModal();
    };
    
    // render a carousel item for each ticket
    renderItems = () => {

        // Call the function every 1000 milliseconds (1 second)
        // const intervalId = setInterval(this.refreshList, 2000);

        const { viewCompleted } = this.state;
        const newTickets = this.state.ticketList;
    
        
        return newTickets.map((item) => (
          <div className="flex carousel-item h-full py-5 m-4">
            <div className="card w-60 bg-base-100">
                <div className="card-body">
                    <p onClick={this.handleViewTicket}>{item.name} {item.location}</p>
                    <dialog id="my_modal_1" className="modal">
                        <form method="dialog" className="modal-box">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="py-4">{item.location}</p>
                        </form>
                    </dialog>
                    
                    <div className="card-actions justify-center">
                        <button className="btn btn-secondary">Bid</button>
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-accent">Buy Now: $xx</button>
                    </div>
                </div>
                
            </div>
          </div>
        ));
    };
    
    render() {
        return (
            <div className="carousel w-96 rounded-box">
                {this.renderItems()}
            </div>
        );
    }
}

export default Featured;