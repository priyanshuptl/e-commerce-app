import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Categories from './Categories/Categories';
const styles = theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    text: {
        margin: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 4,
    },
    subheader: {
        marginTop: theme.spacing.unit,
    },
});

class SwipeableTemporaryDrawer extends React.Component {

    toggleDrawer = (open) => () => {
        this.props.toggleDrawer(open);
    };

    render() {
        const { classes, categories } = this.props;

        const sideList = (
            <div className={classes.list}>
                <Typography className={classes.text}>Shop By Categories</Typography>
                <Divider />
                <List>
                    <Categories
                        categories={categories}
                        toggleDrawer={val => this.toggleDrawer(val)} />
                </List>
            </div>
        );

        return (
            <SwipeableDrawer
                open={this.props.open}
                onClose={this.toggleDrawer(false)}
                onOpen={this.toggleDrawer(true)}
            >
                <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={this.toggleDrawer(false)}
                >
                    {sideList}
                </div>
            </SwipeableDrawer>
        );
    }
}

SwipeableTemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);
