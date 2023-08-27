import React, { Component } from 'react';

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            curId: props.id,
        };
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
        console.log("open " + this.state.curId);
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    render() {
        return (
            <>
                <button className="btn" onClick={this.openModal}>open modal</button>
                {this.state.isModalOpen && (
                    <input type="text" placeholder="Type here" className="input input-bordered input-md w-full max-w-xs" />
                )}
            </>
        );
    }
}

export default Ticket;
