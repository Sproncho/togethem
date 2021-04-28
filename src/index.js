import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {createStore,applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './redux/rootReducer';
import thunk from 'redux-thunk';
import {searchClient} from './services/search-service';
import {InstantSearch} from "react-instantsearch-dom"

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);
const store = createStore(rootReducer,enhancer);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <InstantSearch searchClient={searchClient} indexName={"dev_togethem"}>
          <App />
        </InstantSearch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
