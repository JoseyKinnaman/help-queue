import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as a from './../actions';
class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      6000
    );
  }
  componentDidUpdate() {
    console.log("component updated!");
  }

  componentWillUnmount() {
    console.log("component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    console.log("tick");
  }

  handleClick = () => {
  if (this.state.selectedTicket != null){
    this.setState({
      formVisibleOnPage: false,
      selectedTicket: null,
      editing: false
    });
  } else {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
    }
  }
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = a.addTicket(newTicket);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  }



  handleDeletingTicket = (id) =>{
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing){
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket= {this.handleEditingTicketInList}
     /> 
     buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null){
      currentlyVisibleState =
       <TicketDetail 
          ticket = {this.state.selectedTicket}
          onClickingDelete = {this.handleDeletingTicket} 
          onClickingEdit = {this.handleEditClick}
       />
      buttonText = "Return to Ticket List"
    }
    else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      buttonText = "Return to Ticket List"
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket}/>
      buttonText = "Add ticket"
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button class="btn btn-success" onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl.propTypes ={
  masterTicketList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;