import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


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
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: 'white',
  },
  search: {
    position: 'relative',
    display: 'flex',
    maxHeight: '60%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: '60%',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '80%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  SearchIcon:{
    padding:6,
 
  }
 
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    searchText: '',
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  onSearchTextChange = (event) => {
    this.setState({
      searchText: event.target.value,
    })
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const {
      classes,
      loggedIn,
      wishlistLength,
      cartLength
    } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    console.log('loggedIn:', loggedIn);

    const renderMenu = (
      loggedIn ?
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={() => {
            this.handleMenuClose();
            this.props.logout();
          }}>Logout</MenuItem>
        </Menu> :
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose} >
            <StyledLink to='/register' >Sign Up</StyledLink>
          </MenuItem>
          <MenuItem onClick={() => {
            this.handleMenuClose();
            this.props.openLoginModal();
          }} >
            Login
          </MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >anchorEl
        {
          loggedIn &&
          <MenuItem >
            <StyledLink to='/cart' >
              <IconButton color="inherit">
                <Badge badgeContent={wishlistLength} color="secondary">  <StyledLink to='/wishlist' />
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </Badge>
              </IconButton>
              <p>Wishlist</p>
            </StyledLink>
          </MenuItem>
        }
        <MenuItem >
          <StyledLink to='/cart' >
            <IconButton color="inherit">
              <Badge badgeContent={cartLength} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <p>My Cart</p>
          </StyledLink>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.openSideDrawer} >
              <MenuIcon />
            </IconButton>
            <StyledLink to='/home'>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                eCommerce App
              </Typography>
            </StyledLink>
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                onChange={this.onSearchTextChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
              <IconButton className={classes.SearchIcon} color="inherit"
                onClick={() => this.props.searchProduct(this.state.searchText)}>
                <StyledLink to={'/productList/' + this.state.searchText} >
                  <SearchIcon />
                </StyledLink>
              </IconButton>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {
                loggedIn &&
                <IconButton color="inherit">
                  <StyledLink to='/wishlist' >
                    <Badge badgeContent={wishlistLength} color="secondary">
                      <i className="fa fa-heart" aria-hidden="true"></i>
                    </Badge>
                  </StyledLink>
                </IconButton>
              }
              <IconButton color="inherit">
                <StyledLink to='/cart' >
                  <Badge badgeContent={cartLength} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </StyledLink>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                {
                  loggedIn ?
                    <AccountCircle /> :
                    <MoreIcon />
                }
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);
