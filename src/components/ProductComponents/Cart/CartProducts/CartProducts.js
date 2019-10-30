import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';
import Rating from './../../Rating/Rating';
import Quantity from '../../Quantity/Quantity';

const styles = theme => ({
    card: {
        display: 'flex',
        boxShadow: '1px 1px 1px 1px rgb(11, 77, 131)',
        border: '1px solid grey',
        borderRadius: 3,
        margin: '0 auto',
        marginBottom: 20,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        padding: 8,
    },
    cover: {
        borderRadius: 3,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});


function cartProducts(props) {
    const { classes, product, imageUri } = props;

    let image = null;
    (product.custom_attributes !== undefined) &&
        product.custom_attributes.map(att => {
            if (att.attribute_code === 'image') {
                image = (imageUri + att.value);
            }
            return 0;
        });

    return (
        <Card className={classes.card + ' Card'}>
            <CardMedia
                className={classes.cover + ' Cover'}
                image={image}
                title={product.name}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        <Link
                            to={'/productDescription/' + product.sku}
                            onClick={() => this.props.selectProduct(product)}>
                            {product.name}
                        </Link>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        ${product.price}
                    </Typography>
                    <Typography >
                        Quantity:<Quantity Quantity={product.qty} />
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        <Rating Rating={product.rating} />
                    </Typography>
                </CardContent>
                <CardActions className={classes.CardActions}>
                    <Button size="small" color="primary"
                        onClick={() => props.removeItemFromCart(product)} >
                        Remove item
                    </Button>
                </CardActions>
            </div>
        </Card>
    );
}

cartProducts.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(cartProducts);