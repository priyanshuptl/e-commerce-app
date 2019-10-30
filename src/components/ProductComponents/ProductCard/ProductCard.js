import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from './../Rating/Rating';
import './ProductCard.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const styles = {
  card: {
    width: 345,
    height:450,
    boxShadow: '1px 1px 1px 1px rgb(11, 77, 131)',
    border: '1px solid grey',
    borderRadius: 3,
    margin: '10px 10px 10px 10px',
  },
  root: {
    flexGrow: 1,
  },
  media: {
    height: 210,
  },
  multicard: {
    // padding: 5,
    height:100,
  },
  CardActions: {
    padding: '0px 0px',
    height:110,

  },
  productname:{
    height:80,
  },
  productprice:{
    height:10,
  },
  productrating:{
    height:10,
    fontSize: 0,
  }
};


function MediaCard(props) {
  const { classes, imageUri, productProp } = props;

  const getImage = (productProp !== null && productProp.custom_attributes !== undefined) &&
    productProp.custom_attributes.find(att =>
      (att.attribute_code === 'image')
    );


  const image = (getImage !== undefined) ? imageUri + getImage.value : null;
  console.log("ProductCard image", image);

  return (
    <Card className={classes.card}>

      <StyledLink to={'/productDescription/' + props.productProp.sku}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={image}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.multicard}>

            <Typography className={classes.productname} gutterBottom variant="h5" component="h2">
              {props.productProp.name}
            </Typography>

            <Typography className={classes.productprice} component="p">
              ${props.productProp.price}
            </Typography>
            <div className={classes.productrating}> <Rating  Rating={props.productProp.rating} /></div>

          </CardContent>
        </CardActionArea>
        <CardActions className={classes.CardActions}>

          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <Button size="small" color="primary">
            Add to cart
        </Button>
          {/* <a href='#'>Forget Password</a>
                <p>New User? <Link to='/register' >Register</Link> </p> */}
          <Button size="small" color="primary">
            <StyledLink to={'/productDescription/' + props.productProp.sku}>  More Details</StyledLink>

            {/* More Details */}
          </Button>
        </CardActions>
      </StyledLink>
    </Card>

  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
