import React, { Component } from 'react';
import './style.css';

class Button extends Component {
    render() {
        const { disabled, text, onClick } = this.props;

        return (
            <button
                disabled={disabled}
                className="button"
                onClick={ onClick }>
                    { text }
            </button>
        );
    }
}

export default Button;