import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Modal from 'react-modal';
import '../styles/global.css';
import '../styles/DatePickerOverrides.css';

// Modalの設定
Modal.setAppElement('#__next');

interface MyAppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <Component {...pageProps} />
      </React.StrictMode>
    </Provider>
  );
}

export default MyApp;
