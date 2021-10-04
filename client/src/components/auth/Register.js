import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import InputStyled from './../../components/common/InputStyled';


const Register = ({ setAlert,register, isAuthenticated}) => {
    const[formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name,email,password,password2} = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
      e.preventDefault();
      if(password !== password2) {
          setAlert('Passwords do not match', 'danger');
      } else {
          register({ name,email,password });
      }
    }
    // If user is registered
    if(isAuthenticated){
      return <Redirect to="/dashboard" />
    };

    return( 
    <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <InputStyled 
              label="Full Name" 
              variant="outlined" 
              value={name}
              size="small"
              onChange = {handleChange}
              name="name" />
          </div>
          <div className="form-group">
            <InputStyled 
              label="Email Address"
              variant="outlined" 
              value={email}
              size="small"
              onChange = {handleChange}
              name="email" />
            <small className="form-text"
              >This site uses Gravatar. If you want a profile image, use a
              Gravatar email</small
            >
          </div>
          <div className="form-group">
            <InputStyled 
              type="password"
              label="Password"
              variant="outlined" 
              value={password}
              size="small"
              onChange = {handleChange}
              name="password" />            
              <small className="form-text"
              >Password must contain atleast 6 characters</small>
          </div>
          <div className="form-group">
            <InputStyled 
              type="password"
              label="Confirm Password"
              variant="outlined" 
              value={password2}
              size="small"
              onChange = {handleChange}
              name="password2" />         
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? &nbsp;
          <Link to="/login">
              Sign In
          </Link>
        </p>
        </Fragment>
    );
  };

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register}
)(Register);

