import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ProductCard from '../ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import Button from '@material-ui/core/Button';

let count = 1;
let searchListCount = 1;

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    

    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    button: {
     
        margin: theme.spacing.unit,
        color: 'green',
        border: '2px solid green',
        backgroundColor:'transparent'
    },
  
});

class TitlebarGridList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loadedProducts: false,
        }
    }

    componentDidMount() {
        if (this.props.by === 'category') {
            axios.get(`${this.props.uri}/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${this.props.subcategoryId}&searchCriteria[filter_groups][0][filters][0][condition_type]=in&searchCriteria[sort_orders][0][field]=created_at&searchCriteria[sort_orders][0][direction]=DESC&searchCriteria[current_page]=${count}&searchCriteria[page_size]=10`)
                .then(res => {
                    console.log("Product by category", res.data.items);
                    this.setState({
                        products: res.data.items,
                        loadedProducts: true,
                    });
                });
        } else if (this.props.by === 'search') {
            if (this.props.productListLoaded) {

                console.log("Product by search", this.props.searchedProducts);
                this.setState({
                    products: this.props.searchedProducts,
                    loadedProducts: true,
                })
            } else {
                this.props.loadSearchProducts(this.props.searchText, searchListCount);
            }
        }
    }

    loadMoreHandler = () => {

        if (this.props.by === 'category') {
            axios.get(`${this.props.uri}/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${this.props.subcategoryId}&searchCriteria[filter_groups][0][filters][0][condition_type]=in&searchCriteria[sort_orders][0][field]=created_at&searchCriteria[sort_orders][0][direction]=DESC&searchCriteria[current_page]=${++count}&searchCriteria[page_size]=10`)
                .then(res => {
                    console.log("Load More Product by Category", res.data.items);
                    this.setState({
                        products: {
                            ...res.data.items,
                            ...this.state.products,
                        },
                        loadedProducts: true,
                    });
                });
        } else if (this.props.by === 'search') {
            this.props.loadSearchProducts(this.props.searchText, ++searchListCount);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {
                    (this.state.products.length <= 0 && !this.state.loadedProducts) &&
                    <LinearProgress color="secondary" />
                }
                <Grid container className={classes.container}>
                    {this.state.products.map((tile) => (
                        <Grid class={classes.productcard} item xs={12} sm={6} md={4} lg={3} key={tile.img}>
                            <ProductCard productProp={tile} imageUri={this.props.imageUri} /></Grid>
                    ))}
                </Grid>

                <Button onClick={this.loadMoreHandler} variant="contained" component="span" className={classes.button}>
                    Load More
           </Button>
            </div>
        );
    }
}

// function TitlebarGridList(props) {
//     const { classes } = props;
//     return (
//         <div className={classes.root}>
//             <Grid container className={classes.container}>
//                 {tileData.map(tile => (
//                     <Grid item xs={12} sm={6} md={4} lg={3} key={tile.img}>
//                         <ProductCard productProp={tile}/></Grid>
//                 ))}
//             </Grid>
//         </div>
//     );
// }
TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TitlebarGridList);
