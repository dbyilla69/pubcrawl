import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>
                <h1>
                    <span className="pub-crawler">
                        <span>Pub</span>
                        <img className="person-needs-oc-data" src="http://cdn.taboola.com/static/impl/png/pubcrawl-transparent.png" alt="pubcrawl-logo" /> 
                        <span>Crawler</span>
                        <div className="by-taboola">a <span className="taboola-word">taboola</span> innovation project</div>
                    </span>
                </h1>
            </header>
        );
    }
}

export default Header;
