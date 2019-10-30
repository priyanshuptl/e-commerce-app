import React from 'react';

import MySnackbarContentWrapper from './SnackbarContentWrapper';

class Snackbar extends React.Component {
    state = {
        open:this.props.open
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };

    render() {
        return (
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
                    variant={this.props.variant}
                    onClose={this.handleClose}
                    message={this.props.message}
                />
            </Snackbar>
        );
    }
}

export default Snackbar;