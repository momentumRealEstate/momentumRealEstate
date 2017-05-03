import React, { Component } from 'react'; 
import './App.css';
import { Router, Route, Link, hashHistory } from 'react-router'
import * as firebase from 'firebase';
import SignUp from './authComponents/SignupComponent.js'
import LogIn from './authComponents/LoginComponent.js'
import SignOut from './authComponents/SignoutComponent.js'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBnWOEjLjaAxM6l5PFiJPIMitiVsHOFt2s",
    authDomain: "realestate-momentum.firebaseapp.com",
    databaseURL: "https://realestate-momentum.firebaseio.com",
    projectId: "realestate-momentum",
    storageBucket: "realestate-momentum.appspot.com",
    messagingSenderId: "1031982827010"
  };
  firebase.initializeApp(config);


class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 3000)

    var val = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('*************');
        (function () {
          val.setState({
            user: user
          })
        })();
        
        // console.log(this.state.user)
      } else {
        // No user is signed in.
        console.log('===========') 
        val.setState({
          user: null
        })
      }
    });

    this.state.user ?
    firebase.database().ref('users/' + this.state.user.uid ).on('value', function(snapshot) {
      //console.log('snapshot:- ' + snapshot.val().coord );
      if (snapshot.val()) {  
        this.setState({
          dbCoordsNow: snapshot.val().coord,
        });
      }
      console.log(this.state.dbCoordsNow, '>>>>>>>>')
    })
    : null

  }


  render () {    
    // const condition = this.state.coords ? this.state.coords[this.state.coords.length -1] : 'false';
    
    // checking if user is looged in.
    const showNameIfLoggedin = this.state.user ? this.state.user: false;
    // console.log(this.state.user, 'THIS IS USER')

    return (
      <div>

      </div>
    );
  }

}

export default App;
