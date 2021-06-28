import React, { Component } from 'react';
import './style.css';

class PostCard extends Component {
    render() {
        const { post } = this.props;
        return (
            <article className="post">
                <figure className="post__image-container">
                    <img
                        src={ post.cover }
                        className="post__image"
                        alt={ post.title }
                    />
                </figure>
                <h2>{ post.title }</h2>
                <p>{ post.body }</p>
            </article>
        );
    }
}

export default PostCard;