import './style.css';
import { Component } from 'react';
import Posts from '../../components/Posts';
import Button from '../../components/Button';
import TextField from '../../components/TextField';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            allPosts: [],
            page: 0,
            postsPerPage: 2,
            searchValue: ''
        };
    }

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts = async () => {
        const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
        const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

        const [ posts, photos ] = await Promise.all([ postsResponse, photosResponse ]);

        const postsJson = await posts.json();
        const photosJson = await photos.json();

        const postsAndPhotos = postsJson.map((post, index) => {
            return { ...post, cover: photosJson[index].url};
        });

        const { page, postsPerPage } = this.state;

        this.setState({
            posts: postsAndPhotos.slice(page, postsPerPage),
            allPosts: postsAndPhotos
        });
    }

    loadMorePosts = () => {
        const { allPosts, page, posts, postsPerPage } = this.state;
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice( nextPage, nextPage + postsPerPage );
        posts.push(...nextPosts);
        this.setState({
            posts,
            page: nextPage
        });
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ searchValue: event.target.value });
    }

    filter = (filterKey, datas) => {
        return datas
            .filter(data => data.title.toLowerCase().includes(filterKey.toLowerCase()));
    }

    render() {
        const { allPosts, page, posts, postsPerPage, searchValue } = this.state;
        const isThereMorePost =  (page + postsPerPage) >= allPosts.length;
        const filteredPosts = !!searchValue ? this.filter(searchValue, posts) : posts;
        return (
           <section className="container">
               <div className="search-container">
                    {
                        searchValue && (
                            <h1 className="search-container__title">
                                Search value: { searchValue }
                            </h1>
                        )
                    }
                    <form onSubmit={this.handleChange}>
                        <TextField changeHandler={this.handleChange} searchValue={searchValue}  />
                    </form>
                </div>
                <Posts posts={filteredPosts}/>
                <div className="button-container">
                    {
                        !searchValue && (
                            <Button
                                disabled={isThereMorePost}
                                text="Load More Posts"
                                onClick={this.loadMorePosts}
                            />
                        )
                    }
                </div>
           </section>
        );
    }
}


export default Home;
