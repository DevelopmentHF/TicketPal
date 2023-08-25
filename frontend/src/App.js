import React, { Component } from "react";

const tempTickets = [
  {
    name: "BTV",
    location: "Barunah Plains",
    date: "2023-12-28",
    vendor: "Kaiyuan Qian",
  },
  {
    name: "Taylor Swift",
    location: "MCG",
    date: "2024-02-16",
    vendor: "Henry Feelding",
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      ticketList: tempTickets,
    }
  }

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newTickets = this.state.ticketList;

    
    return newTickets.map((item) => (
      <div className="ticket">
        {item.name}
      </div>
    

    ));
  };
  
  render() {
    return (
      <div className="container">
        Test {this.renderItems()}
      </div>
      
    );
  }
}

export default App;
