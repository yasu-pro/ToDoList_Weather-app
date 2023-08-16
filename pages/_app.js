import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Modal from 'react-modal';
import '../styles/global.css';
import '../styles/DatePickerOverrides.css';

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
