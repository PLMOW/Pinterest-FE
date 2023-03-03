import GlobalStyle from 'libs/style/Globalstyle';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'theme';
import { useSelector } from 'react-redux';

const Providers = ({ children }) => {
  const isDark = useSelector((state) => state.themeSlicer);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Providers;
