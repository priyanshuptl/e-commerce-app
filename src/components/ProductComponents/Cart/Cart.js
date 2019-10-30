import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CartProducts from './CartProducts/CartProducts';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
    fireViewEndCustomEvent,
  } from '../../../Analytics';
  
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

class Cart extends React.Component {

    render() {
        const { classes, imageUri, cart, cartInfo } = this.props;

        const { loggedIn, cartLength, token, server } = this.props.digitalDataDetails;

        const cartEntries = [];

        cart.map(item => {
            cartEntries.push({
                "qty": item.qty,
                "sku": item.sku,
                "title": item.name,
                "price": item.price,
                "formattedPrice": "$" + item.price
            })
            return 0;
        })

        if (this.props.cart.length > 0) {
            window.digitalData = {
                "page": {
                    "pageInfo": {
                        "pageName": "Cart",
                        "destinationURL": document.location,
                        "referringURL": document.referrer,
                        "hierarchie1": "ecommerce:Checkout:Cart",
                        "server": server
                    },
                    "category": {
                        "primaryCategory": "Checkout",
                        "pageType": "Cart"
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
                    "productsInCart": cartLength,
                    "orderId": cartInfo.orderId,
                    "cartAmount": cartInfo.cartAmount,
                    "cartEntries": cartEntries
                },
                "user": [
                    {
                        "profile": [
                            {
                                "profileInfo": {},
                                "attributes": {
                                    "loggedIn": loggedIn,
                                    "username": token
                                }
                            }
                        ]
                    }
                ],
            };
            fireViewEndCustomEvent();
        }

        return (
            <div className={classes.root}>
                {
                    this.props.cart.length > 0 ?
                        <Grid container className={classes.container}>
                            {cart.map((tile, i) => (
                                <Grid key={tile.name + i} item xs={12} sm={12} md={12} lg={12}>
                                    <CartProducts
                                        product={tile}
                                        imageUri={imageUri}
                                        selectProduct={prod => this.props.selectProduct(prod)}
                                        removeItemFromCart={(product) => this.props.removeItemFromCart(product)} />
                                </Grid>
                            ))}
                        </Grid> :
                        <LinearProgress color="secondary" />
                }
            </div>
        )
    }
}
// function cart(props) {
//     const { classes } = props;
//     return (
//         <div className={classes.root}>
//             <Grid container className={classes.container}>
//                 {tileData.map(tile => (
//                     <Grid item xs={12} sm={12} md={12} lg={12} key={tile.img}>
//                         <cartProducts cartProductProp={tile}/>
//                     </Grid>
//                 ))}
//             </Grid>
//         </div>
//     );
// }
Cart.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Cart);
