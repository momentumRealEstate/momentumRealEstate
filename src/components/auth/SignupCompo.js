import React from 'react';
import * as firebase from 'firebase';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const style = {
  marginLeft: 20,
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //this.setState({value: event.target.value});
    const target = event.target;
    //const value = target.type === 'text' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    const val = this

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      }).then(function(user) {
        return user.updateProfile({displayName: val.state.userName});
      }).catch(function(error) {
        console.log(error);
      });


    event.preventDefault();
  }

  render() {

    const DividerExampleForm = () => (
  <Paper zDepth={2}>
    <TextField hintText="First name" style={style} underlineShow={false} />
    <Divider />
    <TextField hintText="Middle name" style={style} underlineShow={false} />
    <Divider />
    <TextField hintText="Last name" style={style} underlineShow={false} />
    <Divider />
    <TextField hintText="Email address" style={style} underlineShow={false} />
    <Divider />
  </Paper>
);


    return (

      <div>
        <form onSubmit={this.handleSubmit} style={{float: 'left'}}>
           <MuiThemeProvider>
            <Paper zDepth={2}>
              <TextField hintText="First name" name='userName' style={style} 
              value={this.state.userName} 
              onChange={this.handleChange} 
              underlineShow={false} 
              />

              <Divider />

              <TextField hintText="Email address" type="email" name='email' 
              value={this.state.email} 
              onChange={this.handleChange} 
              style={style} underlineShow={false} 
              />

              <Divider />

              <TextField hintText="password" type="password" name='password' value={this.state.password} onChange={this.handleChange} style={style} underlineShow={false} />
              <Divider />
            </Paper>
          </MuiThemeProvider>
          <MuiThemeProvider>
            <RaisedButton label="SignUp" value="SignUp" type="submit" primary={true} />
          </MuiThemeProvider>
        </form>
      </div>
    );
  }
}

export default SignUp;