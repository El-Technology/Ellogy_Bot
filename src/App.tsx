import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { ROUTES } from './core/constants/routes';
import { Home } from './pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
    </Routes>
  );
};

export default App;