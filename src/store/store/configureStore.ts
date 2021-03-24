import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const configureStore = (preloadedState: any) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk),
  );

  if ((module as any).hot) {
    // Enable Webpack hot module replacement for reducers
    (module as any).hot.accept('../reducers/rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
