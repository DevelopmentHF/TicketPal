import React, { Component } from "react";
import Featured from "./components/Featured";
import axios from "axios";
import {Navigation} from "./components/Navigations";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./components/Login"
import {Home} from "./components/Home"
import {Logout} from "./components/Logout"

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
      .get("http://localhost:8000/api/tickets/")
      .then((res) => this.setState({ticketList: res.data}))
      .catch((err) => console.log(err));
  }

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };



  render() {
    return (
      <div>
        <BrowserRouter>
          <Navigation></Navigation>
          <div className="">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/logout" element={<Logout/>}/>
            </Routes>
          </div>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
