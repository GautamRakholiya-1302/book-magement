// src/store.js

// src/store.js
import { createStore, combineReducers } from 'redux';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';

// Combine the reducers (product and category reducers)
const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;




// src/actions/productActions.js

// src/actions/productActions.js
export const SET_PRODUCTS = 'SET_PRODUCTS';

// Action to set products
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
};




// src/actions/categoryActions.js



// src/actions/categoryActions.js
export const SET_CATEGORIES = 'SET_CATEGORIES';

// Action to set categories
export const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
};


// src/reducers/productReducer.js

// src/reducers/productReducer.js
import { SET_PRODUCTS } from '../actions/productActions';

// Initial state for products
const initialState = {
  products: [],
};

// Reducer to handle actions related to products
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export default productReducer;


// src/reducers/categoryReducer.js
// src/reducers/categoryReducer.js
import { SET_CATEGORIES } from '../actions/categoryActions';

// Initial state for categories
const initialState = {
  categories: [],
};

// Reducer to handle actions related to categories
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

export default categoryReducer;




// src/index.js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store'; // Import the Redux store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// src/components/Products.js
// src/components/Products.js
import React from 'react';
import { useSelector } from 'react-redux';

const Products = () => {
  // Access the products from the Redux store
  const products = useSelector((state) => state.products.products);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;


// src/components/Categories.js
// src/components/Categories.js
import React from 'react';
import { useSelector } from 'react-redux';

const Categories = () => {
  // Access the categories from the Redux store
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;





// src/App.js
// src/App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from './actions/productActions';
import { setCategories } from './actions/categoryActions';
import Products from './components/Products';
import Categories from './components/Categories';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Example of setting products and categories
    dispatch(setProducts([{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }]));
    dispatch(setCategories(['Electronics', 'Clothing', 'Home Appliances']));
  }, [dispatch]);

  return (
    <div>
      <h1>Product and Category Management</h1>
      <Categories />
      <Products />
    </div>
  );
};

export default App;


Redux Store: We created a basic store that combines product and category reducers.
Actions: We defined simple actions like setProducts and setCategories to modify the state.
Reducers: The reducers update the store’s state based on the dispatched actions.
React Components: We connected components like Products and Categories to Redux using useSelector.
Dispatching Actions: In App.js, we manually dispatch actions to set products and categories in the store when the app loads.
