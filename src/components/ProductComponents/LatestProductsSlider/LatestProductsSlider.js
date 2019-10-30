
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
    root: {
        maxWidth: '100%',
        flexGrow: 1,
        width: '100%',
    },
    header: {
        display: 'block',
        alignItems: 'center',
        height: 60,
        paddingLeft: theme.spacing.unit * 4,
        paddingTop: theme.spacing.unit,
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        maxWidth: 240,
        overflow: 'hidden',
        margin: 'auto',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: 'block'
    },
    sliderPaper: {
        maxWidth: 390,
        flexGrow: 1,
        display: 'inline-block',
        boxSizing: 'border-box',
        width: '20%',
    },
});

class SwipeableTextMobileStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    handleStepChange = activeStep => {
        this.setState({ activeStep });
    };

    render() {
        const { classes, theme, products, imageUri } = this.props;
        const { activeStep } = this.state;
        const maxSteps = products.length;

        const slides = [];
        const length = 5;
        for (let i = 0; i < length; i++) {
            slides.push(
                <div key={"slider" + i}
                    className={classes.sliderPaper}>
                    <StyledLink
                        onClick={() => this.props.selectProduct(products[activeStep + i])}
                        to={`/productDescription/${products[activeStep + i].sku}`}>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={this.handleStepChange}
                            enableMouseEvents
                        >
                            {products.slice(i, maxSteps - (length - i - 1)).map((step, index) => (
                                <div key={i + step.name + index}>
                                    {Math.abs(activeStep - index) <= 2 ?
                                        [
                                            step.custom_attributes.map(att => {
                                                if (att.attribute_code === 'image') {
                                                    return <img className={classes.img}
                                                        src={imageUri + att.value} alt={step.name} />
                                                }
                                                return;
                                            }),
                                            <Paper key={'paper' + step.name + i} square elevation={0} className={classes.header}>
                                                <Typography>{step.name}</Typography>
                                                <Typography>Price: ${step.price}</Typography>
                                            </Paper>
                                        ]
                                        : null}
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                    </StyledLink>
                </div>
            )
        }

        return (
            <div className={classes.root}>
                {slides}
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - length}>
                            Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Prev
            </Button>
                    }
                />
            </div>
        );
    }
}

SwipeableTextMobileStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);
