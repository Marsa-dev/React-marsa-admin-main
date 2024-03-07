import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { store } from './redux/store';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
            <ToastContainer />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
