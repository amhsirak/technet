import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';
import { Fragment } from 'react';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description }
}) => (
  <div>
    <h3 className="text-dark">Worked at {company}</h3>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : 'Now'}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      {location ? (
        <Fragment>
          <strong>Location:</strong> {location}
        </Fragment>
      ) : (null)}
    </p>
    <p>
    {description ? (
        <Fragment>
          <strong>Description:</strong> {description}
        </Fragment>
      ): (null)}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;