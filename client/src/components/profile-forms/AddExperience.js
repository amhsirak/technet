import React , { Fragment, useState }from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import InputStyled from '../../components/common/InputStyled';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const AddExperience = ({addExperience, history}) => {

    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { 
      company, 
      title, 
      location, 
      from, 
      to, 
      current, 
      description 
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
      e.preventDefault();
      addExperience(formData,history);
    }

    return (
        <Fragment>
        <h1 className="large text-primary">
         Add An Experience
        </h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <InputStyled 
              type="text" 
              label="* Job Title" 
              size="small"
              name="title" 
              value={title}
              onChange={onChange}
              required             
            />
          </div>
          <div class="form-group">
            <InputStyled 
              type="text" 
              label="* Company" 
              name="company" 
              size="small"
              value={company}
              onChange={onChange}
              required               
            />
          </div>
          <div class="form-group">
            <InputStyled 
              type="text" 
              label="Location" 
              size="small"
              name="location"
              value={location}
              onChange={onChange}                 
            />
          </div>
          <div class="form-group">
            <h4>From Date</h4>
            <InputStyled 
              type="date" 
              size="small"
              name="from"
              value={from}
              onChange={onChange} 
            />
          </div>
           <div class="form-group">
            <p><input type="checkbox" 
            name="current" 
            checked={current}
            value={current}
            onChange={() => {
                setFormData({ ...formData, current: !current });
            }}
            />{' '} Current Job</p>
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
              placeholder="Job Description"
              value={description}
              onChange={onChange}
            ></TextareaAutosize>
          </div>
          <input type="submit" class="btn btn-primary my-1" />
          <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
        </form>
      </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience));
