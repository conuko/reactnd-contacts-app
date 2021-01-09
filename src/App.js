import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';



class App extends Component {
  state = { // set the initial state directly without a constructor() method
    contacts: []
  }

 /*  
 fetch the contacts from our remote server with a promise and the getAll() method
 from our ContactsAPI.js file at the "componentDidMount" lifecycle method:
  */
  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts
        }))
      })
  }

  removeContact = (contact) => {
    this.setState(currentState => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))

    ContactsAPI.remove(contact);
  }
  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}  // pass our contacts array (the State) to our ListContacts Component
            onDeleteContact={this.removeContact} // pass the removeContact function (the setState) to our ListContacts Componen
          />
        )} />
        <Route path='/create' component={CreateContact}
        />
      </div>
    );
  }
}

export default App;