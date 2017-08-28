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
    		<main>
      			<div className="main-wrapper">
      				<div className="container-fluid">
      					<div className="row">
      						<div className="col-lg-12 col-md-12">
	        					<DraftTable/>
        					</div>	
        				</div>
        			</div>
      			</div>
      		</main>
			<PickForm/>
    	</div>
    );
  }
}

export default App;
