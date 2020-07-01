import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";

function NewTicketForm(props) {
  const NewTicketStyles = {
    backgroundColor: '#ecf0f1',
    fontFamily: 'sans-serif',
    paddingTop: '50px'
  }
  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketCreation({ names: event.target.names.value, location: event.target.location.value, issue: event.target.issue.value, id: v4() });
  }
  return (
    <React.Fragment>
      <div style={NewTicketStyles}>
      <form onSubmit={handleNewTicketFormSubmission}>
        <input
          type='text'
          name='names'
          placeholder='Pair Names' />
          <br/>
        <br />
        <input
          type='text'
          name='location'
          placeholder='Location' />
        <br />
        <br />
        <textarea
          name='issue'
          placeholder='Describe your issue.' />
        <br />
        <br />
        <button type='submit'>Help!</button>
        <br />
        <br />
      </form>
      </div>
    </React.Fragment>
  );
}

NewTicketForm.propTypes ={
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;