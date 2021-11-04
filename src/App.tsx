import React from 'react';
import {I18nextProvider} from 'react-i18next';
import {configAppString} from './Builder';
import {BookLocallyRoot, BookLocallyString} from './modules/book-locally';

const initString = configAppString([BookLocallyString]);
const AppProvider = ({i18n, children}: any) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

const App = () => {
  // You can setting an module which you wanna it's launch
  return (
    <AppProvider i18n={initString}>
      <BookLocallyRoot />
    </AppProvider>
  );
};
export default App;
