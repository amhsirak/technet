import React, {Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';


const Dashboard = ({ getCurrentProfile, auth:{ user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
      <Fragment>
          <DashboardActions />
        </Fragment>
        ) : (
        <Fragment>
            <p>You have not setup a profile yet. Please add some information. </p>
            <Link to='/create-profile' className="btn btn-primary my-1">
                Create Profile
            </Link>
        </Fragment>
        )}
    </Fragment>
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});



export default connect(mapStateToProps,{ getCurrentProfile })(Dashboard);
