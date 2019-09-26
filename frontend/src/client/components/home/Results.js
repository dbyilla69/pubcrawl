import React from 'react';
import '../../assets/stylesheets/results.scss';
import Result from './Result';

export default props => (
    <div className="results">
        <div className="publishers-header">
            <span className="publisher-header-item publishers-header-id">ID</span>
            <span className="publisher-header-item publishers-header-description">DESCRIPTION</span>
            <span className="publisher-header-item publishers-header-name">NAME</span>
        </div>
        {props.pubs.map(({ id, name, description }) => (
            <Result key={id} id={id} name={name} description={description} />
        ))}
    </div>
)
