import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '../styles/tailwind.css';
import '../styles/global.css';
import '../styles/common-button.css';


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
