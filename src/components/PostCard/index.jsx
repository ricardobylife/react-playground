import P from 'prop-types';
import React from 'react';
import './styles.css';

export const PostCard = ({ id, title, cover, body }) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div key={id} className="post-content">
      <h2 key={id}>
        {title} {id}
      </h2>
      <article>{body}</article>
    </div>
  </div>
);

PostCard.propTypes = {
  title: P.string.isRequired,
  cover: P.string.isRequired,
  body: P.string.isRequired,
  id: P.number.isRequired,
};
