import React , { Fragment, useState }from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile'

const AddEducation = ({ addEducation, history })=> {

  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description,
    current
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    addEducation(formData,history);
  }

    return (
      <Fragment>
      <h1 class="large text-primary">
        Add Your Education
      </h1>
      <p class="lead">
        <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={onChange}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={onChange}
            required
          />
        </div>
        <div class="form-group">
          <input type="text" 
          placeholder="* Field Of Study" 
          name="fieldofstudy"
          value={fieldofstudy}
          onChange={onChange}
           required />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" 
          name="from"
          value={from} 
          onChange={onChange}  
          />
        </div>
        <div class="form-group">
          <p>
            <input type="checkbox" 
            name="current" 
            checked={current}
            value={current}
            onChange={() => setFormData({ ...formData, current: !current })}
            />{' '}
            Current School
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date"
          name="to"
          value={to}
          onChange={onChange}
          disabled={current}
           />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
      </Fragment>
    )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null,{ addEducation })(AddEducation);
