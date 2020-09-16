import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './Home.css';

export class Home extends Component {
    render() {
        return (
            
            
            <ul>
                <li><Link to="/newcase">Tel us about your case</Link></li>
                <li><Link to="/admin">Officer's enter</Link></li>
            </ul>
            
        )
    }
}