import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WishListCard from './WishListCard/WishListCard';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        padding: 20,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },

});

function WishList(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                {props.wishlist.map(item => (
                    <Grid item xs={12} sm={12} md={12} lg={12} key={item.product.name}>
                        <WishListCard
                            product={item.product}
                            imageUri={props.imageUri}
                            selectProduct={prod => props.selectProduct(prod)}
                            removeItemFromWishlist={() => props.removeItemFromWishlist(item)} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

WishList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WishList);
