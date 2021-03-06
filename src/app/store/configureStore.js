import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import  rootReducer from '../reducers/rootReducer';

export default function configureStore(preloadedState) {
  const isNotProduction = process.env.NODE_ENV !== "production";
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const storeEnhancers = [middlewareEnhancer];
  const composedEnhancer = isNotProduction ?
    composeWithDevTools(...storeEnhancers) : compose(...storeEnhancers);

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  );

  if (isNotProduction) {
    if (module.hot) {
      module.hot.accept("../reducers/rootReducer", () => {
        const newRootReducer = require("../reducers/rootReducer").default;
        store.replaceReducer(newRootReducer)
      });
    }
  }

  return store;
}