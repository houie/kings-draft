import React from 'react';
import firebase from './firebase';

class NavBar extends React.Component {

	onAuthStateChanged(user) {
		var userPic = document.getElementById('user-pic');
		var userName = document.getElementById('user-name');
		var signInButton = document.getElementById('sign-in');
		var signOutButton = document.getElementById('sign-out');

		if (user) {
	        // Get profile pic and user's name from the Firebase user object.
	        var profilePicUrl = user.photoURL;
	        var displayName = user.displayName;

	        // Set the user's profile pic and name.
	        userPic.style.backgroundImage = 'url(' + (profilePicUrl || '/images/profile_placeholder.png') + ')';
	        userName.textContent = displayName;

	        // Show user's profile and sign-out button.
	        userName.removeAttribute('hidden');
	        userPic.removeAttribute('hidden');
	        signOutButton.removeAttribute('hidden');

	        // Hide sign-in button.
	        signInButton.setAttribute('hidden', 'true');

	    } else { // User is signed out!
	        // Hide user's profile and sign-out button.
	        userName.setAttribute('hidden', 'true');
	        userPic.setAttribute('hidden', 'true');
	        signOutButton.setAttribute('hidden', 'true');

	        // Show sign-in button.
	        signInButton.removeAttribute('hidden');
	    }
	};

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

		function signIn() {
			// Sign in Firebase using popup auth and Google as the identity provider.
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider);
		}

		function signOut() {
			// Sign out of Firebase.
			firebase.auth().signOut();
		}

		return (
			<nav className="navbar sticky-top navbar-dark bg-black white-text">
			    <span className="navbar-brand">Kings Draft</span>
			      <div id="user-container">
			        <div hidden id="user-pic"></div>
			        <div hidden id="user-name"></div>
			        <button hidden id="sign-out" className="btn btn-sm btn-elegant waves-effect waves-light white-text" onClick={signOut}>
			          Sign-out
			        </button>
			        <button hidden id="sign-in" className="btn btn-sm btn-elegant waves-effect waves-light white-text" onClick={signIn}>
			          <i className="material-icons">account_circle</i>Sign-in with Google
			        </button>
			      </div>
			</nav>
		);	
	}
}

export default NavBar;