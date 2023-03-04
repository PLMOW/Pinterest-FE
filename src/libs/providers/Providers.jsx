import GlobalStyle from 'libs/style/Globalstyle';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'theme';
import { useSelector } from 'react-redux';
import Nav from 'shared/Nav';

const Providers = ({ children }) => {
  const isDark = useSelector((state) => state.themeSlicer);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Nav />
      {children}
    </ThemeProvider>
  );
};

export default Providers;
