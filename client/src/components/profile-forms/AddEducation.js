import React , { Fragment, useState }from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { addEducation } from '../../actions/profile'
import InputStyled from '../../components/common/InputStyled';

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
          <InputStyled
            type="text"
            label="* School or Bootcamp"
            size="small"
            name="school"
            value={school}
            onChange={onChange}
            required
          />
        </div>
        <div class="form-group">
          <InputStyled
            type="text"
            label="* Degree or Certificate"
            size="small"
            name="degree"
            value={degree}
            onChange={onChange}
            required
          />
        </div>
        <div class="form-group">
          <InputStyled 
            type="text" 
            label="* Field Of Study" 
            size="small"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={onChange}
            required               
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <InputStyled 
            type="date" 
            name="from"
            size="small"
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
          <InputStyled 
            type="date"
            name="to"
            size="small"
            value={to}
            onChange={onChange}
            disabled={current}
           />
        </div>
        <div class="form-group">
          <TextareaAutosize
            name="description"
            cols="30"
            minRows="5"
            style={{padding: "1rem"}}
            placeholder="Program Description"
            value={description}
            onChange={onChange}
          ></TextareaAutosize>
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

export default connect(null,{ addEducation })(withRouter(AddEducation));
