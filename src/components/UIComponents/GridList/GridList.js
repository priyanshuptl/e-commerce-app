import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridTile from '../GridTile/GridTile';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        left: 0,
        height: 'auto'
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        left: 0,
      
    },
    gridTile:{
    width:200,
    height: 200

    }
});

function SingleLineGridList(props) {
    const { classes, products } = props;

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={4}>
                {products.map(product => (
                    <GridTile className={classes.gridTile} key={product.sku} imageUri={props.imageUri} product={product} />
                ))}
            </GridList>
        </div>
    );
}

SingleLineGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);
