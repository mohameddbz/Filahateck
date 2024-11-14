
import { Route, Routes } from "react-router-dom";
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import RessetPassword from './pages/auth/ResetPassword';
import ForgotPassword from './pages/auth/ForgotPassword';
import AuthLayout from './components/layouts/auth/Layout';
import SidebarLayout from './components/layouts/user/Layout';
import HomeLayout from './components/layouts/Home/Layout';
import HomePage from "./pages/Home/HomePage";
import Ami from "./pages/User/Ami";
import Marketplace from "./pages/User/MarketPlace";
import ProductSubmission from "./pages/User/ProductSubmission";
import StockManagement from "./pages/User/StockManagement";
import Messaging from "./pages/User/Messaagerie";
import Indice from "./pages/User/indice";
import OffresPage from "./pages/Home/Offer";

function App() {
  return (
      <Routes>

          <Route path="/" element={
            <HomeLayout/> 
          }>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/OffresPage" element={<OffresPage/>} />
          </Route>


          <Route path="/auth" element={
            <AuthLayout/> 
          }>
            <Route path="SignUp" element={<SignUp/>} />
            <Route path="SignIn" element={<SignIn/>} />
            <Route path="RessetPassword" element={<RessetPassword/>} />
            <Route path="ForgotPassword" element={<ForgotPassword/>} />
          </Route>


          <Route path="/user" element={
            <SidebarLayout/> 
          }>
            <Route path="/user/ami" element={<Ami/>}/>
            <Route path="/user/marketplace" element={<Marketplace/>}/>
            <Route path="/user/product-submission" element={<ProductSubmission/>}/>
            <Route path="/user/stock-management" element={<StockManagement />} />
            <Route path="/user/Messaging-page" element={<Messaging/>} />
            <Route path="/user/indice" element={<Indice/>} /> 
          </Route>
      </Routes>
  );
}

export default App;
