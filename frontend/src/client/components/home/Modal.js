import React, { Component } from 'react';
import '../../assets/stylesheets/modal.scss';
import Card from './Card';


class Modal extends Component {
  state = {
    show: false,
    id: this.props.id
  };

  // showModal = () => {
  //   this.setState({ show: true });
  // };
  //
  // hideModal = () => {
  //   this.setState({ show: false });
  // };

  render() {
    return (
      <div class="modal" id={this.props.id}>
        <div class="modal-content">
          <span class="close" onClick={this.props.hideModal}>&times;</span>
          <img src="favicon.ico" alt="Avatar"/>
          <h4><b>{this.props.id}</b></h4>
          <p>{this.props.description}</p>
          <p>{this.props.name}</p>
        </div>
        {console.log(this.state.id)}
        </div>
      );
    }
  }


export default Modal;
