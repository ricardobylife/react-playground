import './App.css';
import { Component } from  'react';

class App extends Component{
  state = {
    counter: 0,
    posts: []
  }

  timeoutUpdate = null;

  componentDidMount(){
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponse = fetch('http://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('http://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return {...post, cover: photosJson[index].url }
    })

    this.setState({ posts: postsAndPhotos });
  }

  render(){
    const { posts } = this.state;
    return (
      <section className="container">
        <div className="posts">
        {posts.map( post => (
          <div className="post">
            <img src={post.cover} alt={post.title} />
            <div key={post.id} className="post-content">
              <h1 key={post.id}>{post.title}</h1>
              <article>{post.body}</article>
            </div>
          </div>
        )
        )}
        </div>
      </section>
    );
  }
}

export default App;
