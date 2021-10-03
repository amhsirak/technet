import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login,isAuthenticated }) => {
    const[formData, setFormData] = useState({
        email:'',
        password:''
    });

    const { email,password } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        login(email,password);
    };

// Redirect if logged in 
if(isAuthenticated){
  return <Redirect to="/dashboard" />
}

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
        <form className="form" onSubmit={onSubmit}>
         
          <div className="form-group">
            <div className="input-container">
            <i class="fas fa-envelope"></i>              
            <input type="email" 
            placeholder="Email Address" 
            name="email"
            value={email} 
            onChange = {handleChange} 
            required />
            </div>
          </div>
          <div className="form-group">
            <div className="input-container">
            <i class="fas fa-lock"></i>              
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password} 
              onChange = {handleChange} 
              minLength="6"
              required />              
          </div>
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? 
          <Link to="/register">
              Sign Up
          </Link>
        </p>
        </Fragment>
    );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login);
