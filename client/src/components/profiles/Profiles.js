import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profile: {profiles, loading}}) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);
    return (
        <Fragment>
            { loading ? (<Spinner />)
             : (
             <Fragment>
                <h1 className='large text-primary'>People</h1>
                <p className='lead'>
                <i className='fab fa-connectdevelop' /> Connect with People
                </p> 
                <div className='profiles'>
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                        <ProfileItem key={profile.id} profile={profile} />
                    ))
                    ) : (
                    <h4>No profiles found...</h4>
                    )}
                </div>
             </Fragment>
                )
            }
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps,{ getProfiles })(Profiles);
