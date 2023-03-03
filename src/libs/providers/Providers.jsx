import store from 'redux/store';
import GlobalStyle from 'libs/style/Globalstyle';
import { Provider } from 'react-redux';

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      {children}
    </Provider>
  );
};

export default Providers;
