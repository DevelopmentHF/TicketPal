import React, { Component } from "react";
import axios from "axios";

/*
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
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      ticketList: [],
    }
  }

  componentDidMount() {
    this.refreshList();
  };

  refreshList = () => {
    axios
      .get("/api/tickets/")
      .then((res) => this.setState({ticketList: res.data}))
      .catch((err) => console.log(err));
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
        {item.name} {item.location}
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
