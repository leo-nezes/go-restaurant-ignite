import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import { HandleFoodProvider } from './hooks/useHandleFood';

import GlobalStyle from './styles/global';

const App = (): JSX.Element => (
  <>
    <HandleFoodProvider>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </HandleFoodProvider>
  </>
);

export default App;
