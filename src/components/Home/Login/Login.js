import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import './Login.css';
import { withStyles } from '@material-ui/core/styles';
import Modal from '../../UIComponents/Modal/Modal';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;


const styles = theme => ({
    container: {
        flexWrap: 'wrap',
        textAlign: 'center',
        border: '1px solid grey',
        marginTop: '10%',
        margin: '0 auto'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '90%',
    },
    button: {
        margin: theme.spacing.unit,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});
class OutlinedTextFields extends React.Component {
    state = {
        username: 'deepak.newase@tcs.com',
        password: 'Magento123$',
        loading: false,
        open: false,
    };

    handleUserNameChange = event => {
        console.log('OnChange Username', event.target.value);
        this.setState({
            username: event.target.value,
        });
    };

    handlePasswordChange = event => {
        console.log('OnChange Password', event.target.value);
        this.setState({
            password: event.target.value,
        });
    };

    loginHandler = () => {

        this.setState({ loading: true });
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        const { classes } = this.props;
        return (
            //<div noValidate={false} className={classes.container + ' Container'}>
            <Modal open={this.props.open} handleClose={this.props.handleClose} >
                {/* <div className={classes.placeholder}>
                    <Fade
                        in={this.state.loading}
                        style={{
                            transitionDelay: this.state.loading ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                </div> */}
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
                    onChange={this.handleUserNameChange}
                />

                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                />

                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={this.loginHandler}
                    type='submit'
                    disabled={this.state.loading} >
                    Login
                    {
                        (this.state.loading &&
                            !this.props.loggedIn) &&
                        <CircularProgress size={20} className={classes.buttonProgress} />
                    }
                </Button>
                <br />
                <br />
                <a href='/'>Forget Password</a>
                <p>New User? <StyledLink to='/register' onClick={this.props.handleClose} >Register</StyledLink> </p>
            </Modal>
            //</div>
        );
    }
}


OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(OutlinedTextFields);
