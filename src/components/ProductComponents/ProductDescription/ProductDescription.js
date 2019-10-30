import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from '../Rating/NonEditableRating';
import Button from '@material-ui/core/Button';
import './ProductDescription.css';
import Axios from 'axios';
//import ReactHtmlParser from 'react-html-parser';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import MySnackbarContentWrapper from '../../UIComponents/Snackbar/SnackbarContentWrapper';
import MobileStepper from '../../UIComponents/MobileStepper/MobileStepper';
import GridList from '../../UIComponents/GridList/GridList';

import {
    fireViewEndCustomEvent,
} from '../../../Analytics';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    ProductContainer: {
        display: 'inline-block',
        width: '100%',
    },
    pname: {
        margin: 0,
        maxWidth: 600
    },
    description: {
        display: 'inline-block',
        marginTop: 10,
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    productInfo: {
        margin: '0 20px',
    }
});

class ProductDescription extends React.Component {
    state = {
        tileData: this.props.selectedProduct,
        wishlistClicked: false,
        disableAddToCart: false,
        snackbarOpen: false,
        snackbarMessage: "Operation Successfull!",
        loading: false,
        relatedProducts: [],
        upsellProducts: [],
        crossSellProducts: [],
        productReviews: [],
        overallRating: 0,
    }

    componentDidMount() {
        //----------- Product Description --------------
        Axios.get(`${this.props.uri}/products/${this.props.sku}`)
            .then(res => {
                const product = res.data;
                const tileData = {
                    ...this.state.tileData,
                    ...product
                };
                console.log("[ProductDescription] tileData", tileData);
                this.setState({
                    tileData
                })

                //----------- Related Products --------------
                Axios.get(`${this.props.uri}/getRelatedProductsById/${tileData.id}`)
                    .then(res => {
                        console.log("[ProductDescription] Related Products:", res.data);
                        const relatedProducts = res.data;
                        this.setState({
                            relatedProducts
                        })
                    })
                    .catch(err => {
                        console.log("Error Fetching Related Product", err);
                    });

                //----------- Upsells Products --------------
                Axios.get(`${this.props.uri}/getUpSellProductsById/${tileData.id}`)
                    .then(res => {
                        console.log("[ProductDescription] Upsells Products:", res.data);
                        const upsellProducts = res.data;
                        this.setState({
                            upsellProducts
                        })
                    })
                    .catch(err => {
                        console.log("Error Fetching Upsells Product", err);
                    });

                //----------- crossSell Products --------------
                Axios.get(`${this.props.uri}/getCrossSellProductsById/${tileData.id}`)
                    .then(res => {
                        console.log("[ProductDescription] crossSell Products:", res.data);
                        const crossSellProducts = res.data;
                        this.setState({
                            crossSellProducts
                        })
                    })
                    .catch(err => {
                        console.log("Error Fetching crossSell Product", err);
                    });

                //----------- Product Reviews --------------
                Axios.get(`${this.props.uri}/review/reviews/${tileData.id}`)
                    .then(res => {
                        console.log("[ProductDescription] Product reviews:", res.data[0]);
                        const productReviews = res.data[0];
                        const overallRating = parseFloat(productReviews.avg_rating_percent) * 5 / 100;
                        this.setState({
                            productReviews,
                            overallRating,
                        })
                    })
                    .catch(err => {
                        console.log("Error Fetching crossSell Product", err);
                    });
            })
            .catch(err => {
                console.log("Error Fetching Product", err);
            });
    }

    addToWishlistClick = (event) => {
        event.persist();
        const loading = true;
        this.setState({ loading });
        const { tileData } = this.state;

        if (this.props.loggedIn) {

            Axios.post(`${this.props.uri}/ipwishlist/add/${tileData.id}`)
                .then(resp => {
                    console.log("Added Product in Wishlist", resp.data);
                    const wishlistClicked = true;
                    this.setState({
                        wishlistClicked,
                        loading: false,
                        snackbarOpen: true,
                        snackbarMessage: "Added Product in Wishlist",
                    });
                    console.log("add to wishlist event", event, event.target);
                    this.props.addToWishlist(event.target, tileData);
                });

        } else {
            this.props.openLoginModal();
        }
    }

    addToCartClick = (event) => {
        event.persist();
        const loading = true;
        this.setState({ loading });
        const product = this.state.tileData;
        //---------Generate Quote Id---------
        Axios.post(`${this.props.uri}/carts/mine`)
            .then(res => {
                const quoteId = res.data;
                console.log('quoteId', quoteId);

                let prod = null;

                if (product.type_id === "simple") {
                    prod = {
                        cartItem: {
                            sku: product.sku,
                            qty: 1,
                            quote_id: quoteId
                        }
                    }
                } else if (product.type_id === "downloadable") {
                    prod = {
                        cartItem: {
                            sku: product.sku,
                            qty: 1,
                            quote_id: quoteId
                        }
                    }
                } else if (product.type_id === "bundle") {
                    prod = {
                        cartItem: {
                            sku: product.sku,
                            qty: 1,
                            quote_id: quoteId,
                            product_option: {
                                extension_attributes: {
                                    bundle_options: product.extension_attributes.bundle_product_options
                                }
                            }
                        }
                    }
                } else if (product.type_id === "configurable") {
                    prod = {
                        cartItem: {
                            sku: product.sku,
                            qty: 1,
                            quote_id: quoteId,
                            product_option: {
                                extension_attributes: {
                                    configurable_item_options: product.extension_attributes.configurable_product_options
                                    // [
                                    //     {
                                    //         option_id: 93,
                                    //         option_value: 52
                                    //     },
                                    //     {
                                    //         option_id: 141,
                                    //         option_value: 168
                                    //     }
                                    // ]
                                }
                            },
                            extension_attributes: {}
                        }
                    }
                }
                Axios.post(`${this.props.uri}/carts/mine/items`, prod)
                    .then(resp => {
                        console.log("Added Product in Cart", resp.data);
                        const disableAddToCart = true;
                        this.setState({
                            snackbarOpen: true,
                            snackbarMessage: "Added Product in Cart",
                            loading: false,
                            disableAddToCart,
                            cartClicked: true,
                        });
                        this.props.addToCart(event.target, product);
                    });
            });
    }

    render() {
        const {
            classes,
            imageUri,
        } = this.props;

        const { loggedIn, cartLength, token, server } = this.props.digitalDataDetails;

        let { tileData, disableAddToCart, loading, snackbarOpen, wishlistClicked } = this.state;

        if (tileData !== null) {
            window.digitalData = {
                "page": {
                    "pageInfo": {
                        "pageName": tileData.name,
                        "destinationURL": document.location,
                        "referringURL": document.referrer,
                        "hierarchie1": "ecommerce:Product:Product Detail Page",
                        "server": server
                    },
                    "category": {
                        "primaryCategory": tileData.type_id,//main category
                        "pageType": "Product Detail Page"
                    },
                    "attributes": {},
                    "components": []
                },
                "product": [
                    {
                        "productInfo": {
                            "sku": tileData.sku,
                            "title": tileData.name,
                        }
                    }
                ],
                "cart": {
                    "productsInCart": cartLength
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
            console.log("Loding window data!");
        }

        console.log('tileData', tileData);
        console.log('[ProductDescription] state', disableAddToCart, loading, snackbarOpen, wishlistClicked);

        const getAttributeValue = attribute_code => {
            let value = null;
            if (tileData !== null && tileData.custom_attributes !== undefined) {
                tileData.custom_attributes.map(att => {
                    if (att.attribute_code === attribute_code) {
                        value = att.value;
                    }
                    return 0;
                }
                );
            }
            return value;
        }

        let images = [];
        if (tileData !== null) {
            if (tileData.media_gallery_entries !== undefined) {

                const imagesObj = tileData.media_gallery_entries
                    .filter(ent => ent.media_type === "image");
                images = imagesObj.map(imgObj => (imageUri + imgObj.file));
            } else {
                const imageAttrVal = getAttributeValue('image');
                images.push(imageUri + imageAttrVal);
            }
        }

        console.log("images:", images);

        const description = getAttributeValue('description');
        const shortDescription = getAttributeValue('short_description');
        //const features = getAttributeValue('features');
        const renderDescription = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: description } });
        const renderShortDescription = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: shortDescription } });
        return (
            tileData !== null ?
                <div className={classes.ProductContainer}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={this.state.snackbarOpen}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                    >
                        <MySnackbarContentWrapper
                            variant="success"
                            onClose={this.handleClose}
                            className={classes.margin}
                            message={this.state.snackbarMessage}
                        />
                    </Snackbar>
                    {
                        this.state.loading &&
                        <CircularProgress className={classes.buttonProgress} />
                    }
                    <div className='ImageContainer' >
                        <MobileStepper images={images} label={tileData.name} />
                    </div>
                    <div className={classes.description + ' Description'}>
                        <h2 className={classes.pname}>{tileData.name}</h2>
                        <div style={{
                            display: 'flex',
                        }}>
                            <Rating Rating={this.state.overallRating}></Rating>
                            <Typography variant='subtitle2'
                                style={{ marginLeft: '20px' }} >
                                {
                                    this.state.productReviews.count !== undefined ?
                                        this.state.productReviews.count + " Reviews"
                                        : null
                                }
                            </Typography>
                        </div>
                        <hr />
                        <h5>
                            <label>Price:</label>${tileData.price} &nbsp; &nbsp;&nbsp;
                            <Button
                                size="small"
                                color="secondary"
                                className={classes.button}
                                data-link-name="add-to-wishlist"
                                data-track-action="link-click"
                                disabled={this.state.wishlistClicked}
                                onClick={this.addToWishlistClick}>
                                Add to WishList
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                className={classes.button}
                                data-link-name="add-to-cart"
                                data-track-action="link-click"
                                disabled={this.state.disableAddToCart}
                                onClick={this.addToCartClick}>
                                Add to cart
                        </Button>
                        &nbsp; &nbsp;&nbsp;
                        </h5>
                        {renderShortDescription("<p>&amp;nbsp;</p>")}
                    </div>
                    <div className={classes.productInfo}>
                        <Typography variant='h6'>Description</Typography>
                        {renderDescription("<p>&amp;nbsp;</p>")}

                        {
                            this.state.relatedProducts.length > 0 &&
                            <Typography variant='h6'>Related Products</Typography>
                        }
                        <GridList imageUri={imageUri} products={this.state.relatedProducts} />

                        {
                            this.state.upsellProducts.length > 0 &&
                            <Typography variant='h6'>Products you may like</Typography>
                        }
                        <GridList imageUri={imageUri} products={this.state.upsellProducts} />

                        {
                            this.state.crossSellProducts.length > 0 &&
                            <Typography variant='h6'>Cross Sells Products</Typography>
                        }
                        <GridList imageUri={imageUri} products={this.state.crossSellProducts} />
                    </div>
                </div> :
                <LinearProgress color="secondary" />
        );
    }
}

ProductDescription.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProductDescription);