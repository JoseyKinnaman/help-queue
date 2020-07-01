import React from 'react';
import Header from "./Header";
import TicketList from "./TicketControl";
import TicketControl from './TicketControl';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <React.Fragment>
      <div className="container myclass">
        <Header/>
        <TicketControl/>
      </div>
    </React.Fragment>
  );
}

export default App;
