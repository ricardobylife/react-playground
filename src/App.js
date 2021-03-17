import './App.css';
import { Component } from  'react';

class App extends Component{
  state = {
    counter: 0,
    posts: [
      {
        id: 1,
        title: 'Titulo 1',
        body: 'Corpo 01 Post novo'
      },
      {
        id: 2,
        title: 'Titulo 2',
        body: 'Corpo 02 Post novo'
      },
      {
        id: 3,
        title: 'Titulo 3',
        body: 'Corpo 03 Post novo'
      }
    ]
  }

  timeoutUpdate = null;

  componentDidMount(){
   this.handleTimeout();
  }
  componentDidUpdate(){
    this.handleTimeout();
  }

  componentWillUnmount(){
    clearTimeout(this.timeoutUpdate);
  }

  handleTimeout = () => {
    const { posts, counter } = this.state;
    posts[0].title = 'New Title here!';

    this.timeoutUpdate = setTimeout(() =>{
      this.setState({ posts, counter: counter + 1 });
    }, 1000);
  }

  render(){
    const { posts, counter } = this.state;
    return (
      <div className="App">
        <span>{counter}</span>
        {posts.map( post => (
          <div key={post.id}>
            <h1 key={post.id}>{post.title}</h1>
            <article>{post.body}</article>
          </div>
        )
        )}
      </div>
    );
  }
}

export default App;
