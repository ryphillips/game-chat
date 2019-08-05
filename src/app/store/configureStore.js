import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import homeReducer from '../reducers/homeReducer';

export default function configureStore(preloadedState) {
  const isNotProduction = process.env.NODE_ENV !== "production";
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const storeEnhancers = [middlewareEnhancer];
  const composedEnhancer = isNotProduction ?
    composeWithDevTools(...storeEnhancers) : compose(...storeEnhancers);

  const store = createStore(
    homeReducer,
    preloadedState,
    composedEnhancer
  );

  if (isNotProduction) {
    if (module.hot) {
      module.hot.accept("../reducers/homeReducer", () => {
        const newRootReducer = require("../reducers/homeReducer").default;
        store.replaceReducer(newRootReducer)
      });
    }
  }

  return store;
}