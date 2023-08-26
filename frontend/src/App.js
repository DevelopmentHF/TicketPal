import React, { Component } from "react";
import Featured from "./components/Featured";
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

  // get ticket list
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

  /*
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newTickets = this.state.ticketList;

    
    return newTickets.map((item) => (
      <div className="ticket">
        {item.name} {item.location}
      </div>
    ));
  };
  */
  
  render() {
    return (
      <div>
      <Featured></Featured>
      <div className="carousel rounded-box">
        <div className="carousel-item">
          <img src="/images/stock/photo-1559703248-dcaaec9fab78.jpg" alt="Burger" />
        </div> 
        <div className="carousel-item">
          <img src="/images/stock/photo-1565098772267-60af42b81ef2.jpg" alt="Burger" />
        </div> 
        <div className="carousel-item">
          <img src="/images/stock/photo-1572635148818-ef6fd45eb394.jpg" alt="Burger" />
        </div> 
        <div className="carousel-item">
          <img src="/images/stock/photo-1494253109108-2e30c049369b.jpg" alt="Burger" />
        </div> 
        <div className="carousel-item">
          <img src="/images/stock/photo-1550258987-190a2d41a8ba.jpg" alt="Burger" />
        </div> 
        <div className="carousel-item">
          <img src="/images/stock/photo-1559181567-c3190ca9959b.jpg" alt="Burger" />
        </div> 
        <div className="carousel-item">
          <img src="/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" alt="Burger" />
        </div>
      </div>
      </div>
    );
  }
}

export default App;
