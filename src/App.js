import React, { Component } from 'react';
import './App.css';
import Products from "./components/Products";



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      filterProducts: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:8000/products").then(res => res.json())
      .then(data => this.setState({
        products: data,
        filterProducts: data
      }))
  }


  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  }

  render() {

    return (
      <div className="conatiner">
        <h1>Shopping Cart Example</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <Products products={this.state.filterProducts} handleAddToCart={this.handleAddToCart} />
          </div>
          <div className="col-md-4">

          </div>
        </div>
      </div>
    );
  }
}

export default App;
