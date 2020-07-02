import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return(
    <React.Fragment>
      <form on onSubmit={props.formSubmissionHandler}>
        <input 
        type="text"
        name='names'
        placeholder='Pair Names'/>
        <br/>
        <br />
        <input
          type="text"
          name='location'
          placeholder='Location' />
          <br/>
          <br />
          <textarea
          name='issue'
          placeholder='Describe your issue.' />
          <br/>
          <br />
        <button type='submit'>{props.buttonText}</button>
        <br />
        <br />
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;

