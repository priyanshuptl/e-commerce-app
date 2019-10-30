import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { GridListTile } from '@material-ui/core';

import './GridTile.css';

const styles = theme => ({
    card: {
        maxWidth: 400,
        width: 250,
        height: 280,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    header: {
        height: 40,
    },
    content: {
        paddingBottom: 0,
    }
});

class RecipeReviewCard extends React.Component {

    render() {
        const { classes, product, imageUri } = this.props;

        return (
            <GridListTile >
                <Card className={classes.card + " GridTileCard"}>
                    <CardMedia
                        className={classes.media}
                        image={imageUri + product.image}
                        title={product.name}
                    />
                    <CardContent className={classes.content}>
                        <Typography className={classes.header} component="p">
                            {product.name}
                        </Typography>
                        <Typography component="small">
                            Price: ${product.price}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </GridListTile>
        );
    }
}

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
