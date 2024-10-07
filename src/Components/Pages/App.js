import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login.js';
import ChatPage from './Chat.js';
import routes from '../../routes.js';
import NotFoundPage from './NotFound.js';
import Navbar from './Navbar.js';
import Signup from './Signup.js';
import 'react-toastify/dist/ReactToastify.css';

const PrivateOutlet = () => {
  const auth = useSelector((state) => state.auth);
  return auth.token ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Routes>
        <Route path={routes.signupPagePath()} element={<Signup />} />
        <Route path={routes.loginPagePath()} element={<Login />} />
        <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
          <Route path="" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
