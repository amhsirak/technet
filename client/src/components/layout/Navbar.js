import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({auth:{isAuthenticated, loading}, logout}) => {

  const authLinks = (
    <ul>
      <li>
            <Link to="/dashboard">
              <i className="fas fa-user" /> {''}
              <span className="hide-sm"> Dashboard</span>
              </Link>
          </li>
      <li>
        <Link to="#!" onClick={logout}>
        <i className="fas fa-sign-out-alt"></i> {''}
        <span className="hide-sm"> Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
          <li>
            <Link to="#!">Developers</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
         
        </ul>

  );

    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
          <i class="fa fa-meteor"></i> TechNet
          </Link>
        </h1>
        { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
      </nav>
    );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{logout})(Navbar);
