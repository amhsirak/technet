import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';


const Register = ({ setAlert,register, isAuthenticated}) => {
    const[formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        error: ''
    });

    const { name,email,password,password2,error} = formData;

    const handleChange = e => setFormData((prevState)=>({ ...prevState, error: '', [e.target.name]: e.target.value}));

    const onSubmit = async e => {
      e.preventDefault();
      if (!(password.length > 5)) {
        setFormData(prevState=>({...prevState, error: 'password should be atlease 6 character long'}))
      }
      else if (password !== password2) {        
        setAlert('Passwords do not match', 'danger');        
      }
      else {
        register({ name,email,password });
      }      
    }

// If user is registered
if(isAuthenticated){
  return <Redirect to="/dashboard" />
};

    return( 
    <>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <div className="input-container">          
              <i className="fas fa-user"></i>
              <input            
              type="text"
              placeholder="Full Name" 
              name="name"
              required
              value={name} 
              onChange = {handleChange} 
            />
          </div>  
           
          </div>
          <div className="form-group">
            <div className="input-container">
            <i class="fas fa-envelope"></i>
            <input type="email" 
              placeholder="Email Address" 
              name="email"
              value={email} 
              onChange={handleChange}
              required
             
              />
            </div>
            <small className="form-text"
              >This site uses Gravatar. If you want a profile image, use a
              Gravatar email</small
            >
          </div>
          <div className="form-group">
            <div className="input-container">
            <i class="fas fa-lock"></i>              
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              required
              onChange = {handleChange} 
            />
            </div>
              <span className="form-text" style={{color: 'red'}}>            
              {error && error}
            </span>
          </div>
          <div className="form-group">
            <div className="input-container">
            <i class="fas fa-lock"></i>           
            <input
              required
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2} 
              onChange = {handleChange} 
             
            />
            </div>
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account?
          <Link to="/login">
              Sign In
          </Link>
        </p>
        </>
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

