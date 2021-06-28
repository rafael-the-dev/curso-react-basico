import React, { Component } from 'react';
import './style.css';

class TextField extends Component {
    render() {
        const { changeHandler, searchValue } = this.props;
        return (
            <input
                className="text-field"
                onChange={changeHandler}
                value={searchValue}
                placeholder="Type your search"
                type="search"
            />
        );
    }
}

export default TextField;