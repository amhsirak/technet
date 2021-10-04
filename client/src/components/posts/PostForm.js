import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <TextareaAutosize
          name='text'
          cols='30'
          minRows='5'
          placeholder='Create a post'
          value={text}
          style={{padding: "1rem"}}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);