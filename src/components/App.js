import React, { Component } from 'react'; 
import './App.css';
import { Router, Route, Link, hashHistory } from 'react-router'
import * as firebase from 'firebase';
import SignUp from './auth/SignupCompo.js'
// import LogIn from './authComponents/LoginComponent.js'
// import SignOut from './authComponents/SignoutComponent.js'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {config} from './auth/config.js'
import axios from 'axios'



firebase.initializeApp(config);


class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
    }
    this.ajaxRequest = this.ajaxRequest.bind(this);
  }

  ajaxRequest(userObj) {
    let userStr = '';

    for (let key in userObj) {
      userStr += key + "=" + userObj[key];
    }

    axios.post(`https://us-central1-realestate-momentum.cloudfunctions.net/sendTemplate?${userStr}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    var val = this;
    this.ajaxRequest({user:'kai',userEmail:'kaihsia',templateId:'af985c90-a59e-4682-9282-c1588567e43e',templateName:'sample_2'});
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
        <SignUp/>
      </div>
    );
  }

}

export default App;
