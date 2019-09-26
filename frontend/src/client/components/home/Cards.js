import React, {Component} from 'react';
import '../../assets/stylesheets/cards.scss';
import Card from './Card';
import Modal from './Modal';
import ReactDOM from "react-dom";

class Cards extends Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
      {this.props.pubs.map(({ id, name, description }) => (
        <div class="cards-container" >
          <Card key={id} id={id} name={name} description={description} openModal={this.showModal}/>
          {this.state.show && <Modal key={id} id={id} name={name} description={description} hideModal={this.hideModal} {...this.state}/>}
        </div >
    ))}
    {console.log(this.state)}
    </div>
  );
  }


}

export default Cards
