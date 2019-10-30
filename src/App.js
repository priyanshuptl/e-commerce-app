import React, { Component } from 'react';
import 'typeface-roboto';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

import Login from './components/Home/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Home/Register/Register';
import SideDrawer from './components/UIComponents/Drawer/Drawer';
import AppBar from './components/UIComponents/AppBar/AppBar';
import ProductDescription from './components/ProductComponents/ProductDescription/ProductDescription';
import WishList from './components/ProductComponents/WishList/WishList'
import ProductList from './components/ProductComponents/ProductList/ProductList'
import Cart from './components/ProductComponents/Cart/Cart';
import MySnackbarContentWrapper from './components/UIComponents/Snackbar/SnackbarContentWrapper';
import Footer from './components/UIComponents/Footer/Footer';

import './App.css';

import {
  fireViewStartCustomEvent,
  fireViewEndCustomEvent,
  fireActionTriggerCustomEvent
} from './Analytics';

const server = 'http://172.29.178.120:8080';
const uri = server + '/mymagento/index.php/rest/V1';
const imageUri = 'http://172.29.178.120:8080/mymagento/pub/media/catalog/product';

class App extends Component {

  constructor() {
    super();
    console.log("[App] [constructor]");
    this.state = {
      loggedIn: false,
      sideDrawerOpen: false,
      snackbarOpen: false,
      openLoginModal: false,
      openLoginErrorSnackbar: false,
      products: [],
      selectedProduct: null,
      wishlist: [],
      cart: [],
      categories: [],
      token: null,
      loading: false,
      searchedProducts: [],
      productListLoaded: false,
      productListCount: 1,
    }
  }

  componentWillMount(state) {
    fireViewStartCustomEvent(state);
  }

  componentDidMount() {

    console.log("[App] [componentDidMount]");
    axios.get(`${uri}/products?searchCriteria[sortOrders][0][field]=created_at&searchCriteria[sortOrders][0][direction]=DESC&searchCriteria[pageSize]=10`)
      .then(res => {
        console.log(res.data.items);
        this.setState({
          products: res.data.items,
        })
      });

    axios.get(`${uri}/carts/mine`)
      .then(res => {
        console.log("Cart Data", res.data);
        this.setState({
          cart: res.data,
        })
      });

    if (this.state.loggedIn) {
      axios.get(`${uri}/ipwishlist/items`)
        .then(res => {
          console.log("Wishlist Data", res.data);
          this.setState({
            wishlist: res.data
          })
        });
    }

    axios.get(`${uri}/categories`)
      .then(res => {
        console.log("Categories Data", res.data.children_data);
        this.setState({
          categories: res.data.children_data
        })
      });
  }

  loginHandler = (username, password) => {

    //fireActionTriggerCustomEvent();
    this.setState({ loading: true });
    axios.post(uri + '/integration/customer/token', {
      username,
      password
    }).then(res => {
      console.log(res.data);
      this.setState({
        loggedIn: true,
        openLoginModal: false,
        token: res.data,
        loading: false,
      });
      axios.get(`${uri}/carts/mine`)
        .then(res => {
          console.log("Cart Data", res.data);
          this.setState({
            cart: res.data,
          })
        });

      axios.get(`${uri}/ipwishlist/items`)
        .then(res => {
          console.log("Wishlist Data", res.data);
          this.setState({
            wishlist: res.data
          })
        });
    }).catch(err => {
      console.log(err);
      this.setState({
        loading: false,
        openLoginErrorSnackbar: true
      });
    })
  }

  logoutHandler = () => {
    this.setState({ loggedIn: false });
  }

  registerHandler = () => {
    this.setState({ loggedIn: true })
  }

  openSideDrawerHandler = () => {
    console.log("[openSideDrawerHandler]");
    this.setState({ sideDrawerOpen: true });
  }

  openLoginModalHandler = () => {
    console.log("[openLoginModalHandler]");
    this.setState({ openLoginModal: true });
  }

  closeLoginModalHandler = () => {
    console.log("[closeLoginModalHandler]");
    this.setState({ openLoginModal: false });
  }

  toggleDrawerHandler = open => {
    this.setState({ sideDrawerOpen: open });
  }

  selectProductHandler = product => {
    console.log("Product Selected", product);
    this.setState({
      selectedProduct: product,
    });
  }

  addToWishlistHandler = (target, product) => {
    console.log("Target:", target);
    fireActionTriggerCustomEvent(target, {
      detail: {
        "linkName": target.getAttribute("data-link-name"),
        "action": target.getAttribute("data-track-action")
      }
    });

    axios.get(`${uri}/ipwishlist/items`)
      .then(res => {
        console.log("Wishlist Data", res.data);
        this.setState({
          wishlist: res.data
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          snackbarOpen: true,
        });
      });
  }

  addToCartHandler = (target, product) => {
    console.log("Target:", target);
    fireActionTriggerCustomEvent(target, {
      detail: {
        "linkName": target.getAttribute("data-link-name"),
        "action": target.getAttribute("data-track-action")
      }
    });

    axios.get(`${uri}/carts/mine`)
      .then(res => {
        console.log("Cart Data", res.data);
        this.setState({
          cart: res.data,
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          snackbarOpen: true,
        });
      });
  }

  removeItemFromCartHandler = (product) => {

    //fireActionTriggerCustomEvent();

    this.setState({ loading: true });
    console.log("Deleting Product from cart", product);
    axios.delete(`${uri}/carts/mine/items/${product.item_id}`)
      .then(res => {
        console.log("Deleted Product from cart", res.data);

        axios.get(`${uri}/carts/mine`)
          .then(res => {
            console.log("Cart Data", res.data);
            this.setState({
              cart: res.data,
              loading: false,
            })
          })
          .catch(err => {
            console.log(err);
            this.setState({
              loading: false,
              snackbarOpen: true,
            });
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          snackbarOpen: true,
        });
      });
  }

  removeItemFromWishlistHandler = product => {

    //fireActionTriggerCustomEvent();

    this.setState({ loading: true });
    console.log("Deleting Product from wishlist", product);

    axios.delete(`${uri}/ipwishlist/delete/${product.wishlist_item_id}`)
      .then(res => {
        console.log("Deleted Product from wishlist", res.data);

        axios.get(`${uri}/ipwishlist/items`)
          .then(res => {
            console.log("Wishlist Data", res.data);
            this.setState({
              wishlist: res.data,
              loading: false,
            })
          })
          .catch(err => {
            console.log(err);
            this.setState({
              loading: false,
              snackbarOpen: true,
            });
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          snackbarOpen: true,
        });
      });
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openLoginErrorSnackbar: false });
  };

  searchProductHandler = (text, count) => {
    console.log("searching for  product " + text + "...");
    axios.get(`${uri}/products?searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=%25${text}%25&searchCriteria[filter_groups][0][filters][0][condition_type]=like&searchCriteria[sort_orders][0][field]=created_at&searchCriteria[sort_orders][0][direction]=DESC&searchCriteria[current_page]=${count}&searchCriteria[page_size]=10`)
      .then(res => {
        console.log("search product result", res.data);
        this.setState({
          searchedProducts: [
            ...this.state.searchedProducts,
            ...res.data.items,
          ],
          productListLoaded: true,
        })
      })
  }

  render() {
    console.log("[App] [render]");

    const cart = this.state.cart.items !== undefined ? this.state.cart.items : [];
    const digitalDataDetails = {
      server,
      cartLength: cart.length,
      loggedIn: this.state.loggedIn,
      token: this.state.token
    }

    let cartAmount = 0;
    cart.map(item => {
      cartAmount += (item.qty * item.price);
      return 0;
    });

    const cartInfo = {
      orderId: this.state.cart.id,
      cartAmount,
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`;

    const home = () => (this.state.products !== undefined &&
      this.state.products.length > 0) ?
      <Home
        products={this.state.products}
        imageUri={imageUri}
        selectProduct={product => this.selectProductHandler(product)}
        digitalDataDetails={digitalDataDetails} /> :
      <LinearProgress color="secondary" />

    console.log("[App] [before return]");
    return (
      <div id='app' className="App">
        {
          this.state.loading &&
          <CircularProgress style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
            zIndex: 100,
          }} />
        }
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.openLoginErrorSnackbar}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            variant="error"
            onClose={this.handleClose}
            message="Invalid Username or Password provided!"
          />
        </Snackbar>
        {/* <Snackbar
          open={this.state.snackbarOpen}
          variant='error'
          message='Some Error Occurred!' /> */}
        <SideDrawer
          open={this.state.sideDrawerOpen}
          toggleDrawer={open => this.toggleDrawerHandler(open)}
          categories={this.state.categories} />
        <AppBar
          logout={this.logoutHandler}
          openSideDrawer={this.openSideDrawerHandler}
          openLoginModal={this.openLoginModalHandler}
          loggedIn={this.state.loggedIn}
          cartLength={cart.length}
          wishlistLength={this.state.wishlist.length}
          searchProduct={(text) => this.searchProductHandler(text, 1)} />

        <Login
          login={(user, pass) => this.loginHandler(user, pass)}
          loggedIn={this.state.loggedIn}
          open={this.state.openLoginModal}
          handleClose={this.closeLoginModalHandler} />
        <div className='MainContainer'>
          <Switch>
            <Route exact path='/' component={home} />
            <Route exact path='/register'
              component={() =>
                <Register
                  register={this.registerHandler}
                  uri={uri}
                  cartLength={cart.length}
                  server={server} />} >
            </Route>
            <Route exact path='/home' component={home} />
            <Route exact path='/category/:categoryId/:subcategoryId'
              component={({ match }) =>
                <ProductList
                  by='category'
                  subcategoryId={match.params.subcategoryId}
                  uri={uri}
                  imageUri={imageUri}
                  productListLoaded={this.state.productListLoaded}
                  loadMore={this.loadMoreHandler} />}
            />
            <Route exact path='/productList/:searchText'
              component={({ match }) =>
                <ProductList
                  by='search'
                  searchedProducts={this.state.searchedProducts}
                  imageUri={imageUri}
                  searchText={match.params.searchText}
                  productListLoaded={this.state.productListLoaded}
                  loadSearchProducts={(text, count) => this.searchProductHandler(text, count)}
                  loadMore={this.loadMoreHandler}
                />}
            />
            //
            <Route exact path='/wishlist'
              component={() =>
                <WishList
                  wishlist={this.state.wishlist}
                  imageUri={imageUri}
                  selectProduct={product => this.selectProductHandler(product)}
                  removeItemFromWishlist={prod => this.removeItemFromWishlistHandler(prod)} />}
            />
            <Route exact path='/cart'
              component={() =>
                <Cart
                  cart={cart}
                  cartInfo={cartInfo}
                  imageUri={imageUri}
                  uri={uri}
                  selectProduct={product => this.selectProductHandler(product)}
                  removeItemFromCart={(product) => this.removeItemFromCartHandler(product)}
                  digitalDataDetails={digitalDataDetails} />}
            />
            <Route exact
              path='/productDescription/:sku'
              component={({ match }) =>
                <ProductDescription
                  sku={match.params.sku}
                  imageUri={imageUri}
                  uri={uri}
                  selectedProduct={this.state.selectedProduct}
                  addToWishlist={(target, product) => this.addToWishlistHandler(target, product)}
                  addToCart={(target, product) => this.addToCartHandler(target, product)}
                  loggedIn={this.state.loggedIn}
                  openLoginModal={this.openLoginModalHandler}
                  digitalDataDetails={digitalDataDetails} />

              }
            >
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
export default withRouter(App);