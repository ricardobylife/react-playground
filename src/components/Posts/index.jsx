import P from 'prop-types';
import React from 'react';
import './styles.css';
import { PostCard } from '../PostCard';

export const Posts = ({ posts = [] }) => (
  <div className="posts">
    {posts.map((post) => (
      <PostCard key={post.id} title={post.title} cover={post.cover} body={post.body} id={post.id} />
    ))}
  </div>
);
Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: P.arrayOf(
    P.shape({
      title: P.string.isRequired,
      cover: P.string.isRequired,
      body: P.string.isRequired,
      id: P.number.isRequired,
    })
  ),
};
