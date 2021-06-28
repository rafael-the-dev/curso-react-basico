import React, { Component } from 'react';
import PostCard from '../PostCard';
import './style.css';

class Posts extends Component {
    render() {
        const { posts } = this.props;
        return (
            <div className="posts">
                {
                    posts.map(element => <PostCard post={ element } key={ element.id }/>)
                }
            </div>
        )
    }
}

export default Posts;