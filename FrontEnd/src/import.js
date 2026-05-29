// Import from components
import Header from './components/Header';
import Home from './components/Home';
import SignInAndSignUp from './components/SignnInAndSIngUp';
import UserProfile from './components/UserProfile';
// import DashBoard from './components/DashBoard';
import UserDashBoard from './pages/UserDashBoard';
import Footer from './components/Footer';
import Docs from './components/Docs';


//import from Login Related
import ForgetPassword from './LoginRelated/ForgotPassword';

// Import from pages
import Error from './pages/Error';
import SignInPrompt from './pages/SignInPrompt';
import BarChart from './pages/UserBarGraph';

//import from functions
import { presentDateGenerator } from './Functions/getCurrentTime';



// Import from others
const BackEndPort = process.env.REACT_APP_NODE_ENV === "development" ? "http://localhost:9090/api" : "/api";

// Export statements
export {
  Header, Home, SignInAndSignUp, UserProfile, UserDashBoard, Footer, Docs
  , ForgetPassword
  , Error, SignInPrompt, BarChart
  , presentDateGenerator,
  BackEndPort
};
