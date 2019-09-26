import React, { Component } from 'react';
import '../../assets/stylesheets/card.scss';



function Card(props) {
        return (
          <div class="card-container" onClick={props.openModal}>
            <img class="thumbnail" src="favicon.ico" alt="Avatar" id={props.id}/>
            <div class="card-info" >
              <h4><b>{props.id}</b></h4>
              <p>{props.description}</p>
              <p>{props.name}</p>
            </div>
          </div>
        );
    }


export default Card;
