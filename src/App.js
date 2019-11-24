import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer, Flip } from 'react-toastify';
import '~/config/ReactotronConfig';
import history from '~/services/history';
import GlobalStyle from '~/styles/global';
import Routes from '~/routes';
import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <GlobalStyle />
          <ToastContainer autoClose={3000} transition={Flip} />
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
