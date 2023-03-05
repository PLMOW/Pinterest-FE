import GlobalStyle from 'styles/Globalstyle';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'theme';
import { useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import Nav from 'shared/Nav';

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  const isDark = useSelector((state) => state.themeSlicer);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Nav />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
