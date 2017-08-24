import React, { Component } from 'react';
import './App.css';
import NavBar from './scripts/nav-bar'
import DraftTable from './scripts/draft-table'
import PickForm from './scripts/pick-form'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <DraftTable/>
        <PickForm/>
      </div>
    );
  }
}

export default App;
