import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const styles = theme => ({
    root: {
        width: '100%',
        display: 'inline-block'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    link: {
        width: '100%',
        border: '2px solid black'
    },
    subcatContainer: {
        display: 'block',
    }
});

class ControlledExpansionPanels extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes, index, category } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={expanded === 'panel' + index} onChange={this.handleChange('panel' + index)}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>{category.name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.subcatContainer}>
                        {
                            category.children_data.map(subcategory =>
                                <StyledLink
                                    to={`/category/${category.id}/${subcategory.id}`}
                                    key={"subcategory" + subcategory}
                                    onClick={this.props.toggleDrawer(false)} >
                                    <ListItem button>
                                        <ListItemText primary={subcategory.name} />
                                    </ListItem>
                                </StyledLink>
                            )
                        }
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

ControlledExpansionPanels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
