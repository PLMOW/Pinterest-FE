import GlobalStyle from 'styles/Globalstyle';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'theme';
import { useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import Nav from 'shared/Nav';

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  const isDark = useSelector((state) => state.themeSlicer);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Nav />
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Providers;
