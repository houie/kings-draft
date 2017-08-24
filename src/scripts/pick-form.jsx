import React from 'react';
import firebase from './firebase';

class PickForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  resetField() {
    this.setState({value: ''});
  }

  handleSubmit(event) {

    var _this = this;
    var db = firebase.database();

    this.gamesRef = db.ref('games');
    this.picksRef = db.ref('picks');

    // Check that the user entered a message and is signed in.
    var currentUser = firebase.auth().currentUser;
    if (this.state.value && currentUser) {

      var ref = db.ref('games');
      ref.child(this.state.value).once("value", function(data) {
        var gameData = data.val();
        _this.picksRef.orderByChild('pick').limitToLast(1).once("value", function(data) {
          var nextPick = 1;
          var pickData = data.val();
          if (pickData) {
            nextPick = Object.values(pickData)[0].pick+1;
          }
          _this.picksRef.child(nextPick).set({
            pick: nextPick,
            shareholder: currentUser.displayName,
            gameId: gameData.gameId
          }).then(function() {
            _this.resetField();
          }).catch(function(error) {
            console.error('Error writing new message to Firebase Database', error);
          });
        });
      });


    event.preventDefault();
    }
  }

  onAuthStateChanged(user) {
    var pickForm = document.getElementById('pick-form-wrapper');

    if (user) {
      pickForm.removeAttribute('hidden');
    }
    else {
      pickForm.setAttribute('hidden', 'true');
    }
  }

  authListener() {
      var _this = this;
      firebase.auth().onAuthStateChanged((user) => {
        _this.onAuthStateChanged(user);
      });
  }

  componentWillMount() {
      this.authListener = this.authListener.bind(this);
      this.authListener();
  }

  render() {
    return (
        <nav hidden id='pick-form-wrapper' className="navbar fixed-bottom navbar-dark bg-black white-text justify-content-end">
          <form id='pick-form' className="form-inline" onSubmit={this.handleSubmit}>
              <input className="form-control mr-sm-2" type="text" value={this.state.value} placeholder="Game Id" onChange={this.handleChange} aria-label="Search"></input>
              <button className="btn btn-sm btn-elegant my-0" type="submit">Submit</button>
          </form>
        </nav>
    );
  }
}

export default PickForm;
