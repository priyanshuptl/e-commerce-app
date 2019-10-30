import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import MySnackbarContentWrapper from '../../UIComponents/Snackbar/Snackbar';
import './Register.css';
import {
  fireViewEndCustomEvent,
} from '../../../Analytics';


const styles = theme => ({
  container: {
    flexWrap: 'wrap',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '10px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 'auto',
  }, button: {
    margin: theme.spacing.unit,
  }, placeholder: {
    height: 40,
  }, margin: {
    margin: theme.spacing.unit,
  },
});

class Register extends Component {

  state = {
    loading: false,
    open: false,
    snackbarMessage: "Something Went Wrong!",
    firstname: '',
    lastname: '',
    birthdate: '',
    email: '',
    password: '',
    confirmPassword: 'cp',
    city: '',
    region: '',
    region_id: '',
    country_id: '',
    telephone: '9879879875',

  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  registerHandler = () => {
    console.log(this.state);
    this.setState({ loading: true });

    if ((this.state.password === this.state.confirmPassword) && (this.state.password.length >= 6 || this.state.confirmPassword >= 6)) {
      const entity = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        birthdate: this.state.birthdate,
        address: {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          street: this.state.street,
          city: this.state.city,
          region: this.state.region,
          region_id: this.state.region_id,
          country_id: this.state.country_id,
          telephone: this.state.telephone,
          postcode: this.state.postcode
        }
      };

      console.log("Entity:", entity);
      var result;
      axios.post(
        this.props.uri + '/createNewCustomer', {
          entity
        }).then(res => {
          console.log(res.data);
          result = res.data;
          // if(res.data==='Customer is Already Exist!')
          //  this.props.register();
          this.setState({
            loading: false,
            open: true,
            snackbarMessage: result,
          });
        }).catch(err => {
          console.log(err);
          this.setState({
            loading: false,
            open: true,
            snackbarMessage: result,
          });
        });
    } else if (this.state.password.length < 6 || this.state.confirmPassword < 6) {
      this.setState({
        loading: false,
        open: true,
        snackbarMessage: "Password should be of at least 6 characters."
      });
    }
    else {
      this.setState({
        loading: false,
        open: true,
        snackbarMessage: "Password doesn't match!"
      });
    }
  }

  handleClick = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    window.digitalData = {
      "page": {
        "pageInfo": {
          "pageName": "Registration",
          "destinationURL": document.location,
          "referringURL": document.referrer,
          "hierarchie1": "ecommerce:Account:Registration",
          "server": this.props.server
        },
        "category": {
          "primaryCategory": "Account",
          "pageType": "Registration" 
        },
        "attributes": {},
        "components": []
      },
      "product": [
        {
          "productInfo": {}
        }
      ],
      "cart": {
        "productsInCart": this.props.cartLength
      },
      "user": [
        {
          "profile": [
            {
              "profileInfo": {},
              "attributes": {
                "loggedIn": false,
                 "username": ""
              }
            }
          ]
        }
      ],
    };
    fireViewEndCustomEvent();

    const { classes } = this.props;
    return (
      <div className={classes.container + ' Container'}>
        <div className={classes.placeholder}>
          <Fade
            in={this.state.loading}
            style={{
              transitionDelay: this.state.loading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            variant="error"
            onClose={this.handleClose}
            className={classes.margin}
            message={this.state.snackbarMessage}
          />
        </Snackbar>
        <TextField
          required
          label="First Name"
          className={classes.textField}
          type="text"
          margin="normal"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.handleClick('firstname', e.target.value)}
        />

        <TextField
          required
          label="Last Name"
          className={classes.textField}
          type="text"
          margin="normal"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.handleClick('lastname', e.target.value)}
        />

        <TextField
          required
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.handleClick('email', e.target.value)}
        />

        <TextField
          required
          // label="Date of Birth"
          className={classes.textField}
          type="date"
          margin="normal"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.handleClick('birthdate', e.target.value)}
        />

        <Typography>Address</Typography>
        <TextField
          label="Street"
          className={classes.textField}
          type="text"
          margin="normal"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.handleClick('street', e.target.value)}
        />

        <TextField
          label="City"
          className={classes.textField}
          type="text"
          margin="normal"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.handleClick('city', e.target.value)}
        />

        <TextField
          label="State"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.handleClick('state', e.target.value)}
        />

        <TextField
          label="Country"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.handleClick('country', e.target.value)}
        />

        <TextField
          label="Pin Code"
          className={classes.textField}
          type="number"
          margin="normal"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.handleClick('postcode', e.target.value)}
        />
        <TextField
          required
          label="mobile no"
          className={classes.textField}
          type="number"
          margin="normal"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.handleClick('telephone', e.target.value)}
        />

        <TextField
          required
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"

          onChange={(e) => this.handleClick('password', e.target.value)}
        />

        <TextField
          required
          label="Confirm Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"

          onChange={(e) => this.handleClick('confirmPassword', e.target.value)}
        />
        <br />

        <Button
          variant="contained"
          className={classes.button}
          onClick={this.registerHandler}
          type='submit' >
          Register
        </Button>
      </div>
    );
  }
}


export default withStyles(styles)(Register);