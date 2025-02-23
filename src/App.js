
import { Route, Routes } from "react-router-dom";
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import RessetPassword from './pages/auth/ResetPassword';
import ForgotPassword from './pages/auth/ForgotPassword';
import AuthLayout from './components/layouts/auth/Layout';
import SidebarSellerLayout from './components/layouts/Seller/Layout';
import SidebarLayout from './components/layouts/user/Layout';
import SidebarLayoutAdmin from './components/layouts/admin/Layouts';
import HomeLayout from './components/layouts/Home/Layout';
import HomePage from "./pages/Home/HomePage";
import Ami from "./pages/User/Ami";
import FermeMap from "./pages/User/FermeMap ";
import CurrentAbonnement from "./pages/User/Abonement";
import UserManagement from "./pages/admin/users/userManagement";
import AbonnementManagement from "./pages/admin/abonement/abonementManagement";
import Abonnement from "./pages/admin/abonement/abonement";
import Parcelle from "./pages/admin/indice/Parcelle";
import SellerAbonnement from "./pages/admin/abonement/SellerAbonnement";
import SellerAbonnementManagement from "./pages/admin/abonement/SellerAbonnementManagement";
import FonctionalityManagement from "./pages/admin/abonement/fonctionalities";
import Indices from "./pages/admin/indice/indice";
import Legends from "./pages/admin/indice/legends";
import Marketplace from "./pages/User/MarketPlace";
import ProductSubmission from "./pages/User/ProductSubmission";
import StockManagement from "./pages/User/StockManagement";
import UserProfile from "./pages/User/profile";
import Messaging from "./pages/User/Messaagerie";
import Historique from "./pages/User/historique";
import Indice from "./pages/User/indice";
import OffresPage from "./pages/Home/Offer";
import ProductDetails from "./pages/User/ProductDetails";
import MyProductDetail from "./pages/User/MyProductDetail";
import OffresSeller from "./pages/Seller/Offre";
import ProductSubmissionSeller from "./pages/Seller/ProductSubmission";

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
            <Route path="/user/ferme-map" element={<FermeMap/>} />
            <Route path="/user/ami" element={<Ami/>}/>
            <Route path="/user/profile" element={<UserProfile/>}/>
            <Route path="/user/Abonnement" element={<CurrentAbonnement/>}/>
            <Route path="/user/marketplace" element={<Marketplace/>}/>
            <Route path="/user/product-details/:id" element={<ProductDetails/>}/>
            <Route path="/user/my-product-details/:id" element={<MyProductDetail/>}/>
            <Route path="/user/product-submission" element={<ProductSubmission/>}/>
            <Route path="/user/stock-management" element={<StockManagement />} />
            <Route path="/user/Messaging-page" element={<Messaging/>} />
            <Route path="/user/ferme-map/:parcelId" element={<Indice/>} /> 
            <Route path="/user/historique/:indexId/:parcelId" element={<Historique/>} /> 
          </Route>
          <Route path="/seller" element={
            <SidebarSellerLayout/> 
          }>
            <Route path="/seller/marketplace" element={<Marketplace/>}/>
            <Route path="/seller/offre" element={<OffresSeller/>}/>
            <Route path="/seller/product-details/:id" element={<ProductDetails/>}/>
            <Route path="/seller/my-product-details/:id" element={<MyProductDetail/>}/>
            <Route path="/seller/product-submission" element={<ProductSubmissionSeller/>}/> 
          </Route>

          <Route path="/admin" element={
            <SidebarLayoutAdmin/> 
          }>
            <Route path="/admin/UserManagement" element={<UserManagement/>}/>
            <Route path="/admin/AbonnementManagement" element={<AbonnementManagement/>}/>
            <Route path="/admin/fonctionalities" element={<FonctionalityManagement/>}/>
            <Route path="/admin/indices" element={<Indices/>} /> 
            <Route path="/admin/legend" element={<Legends/>} /> 
            <Route path="/admin/Abonnement" element={<Abonnement/>} /> 
            <Route path="/admin/Parcelle" element={<Parcelle/>} /> 
            <Route path="/admin/SellerAbonnement" element={<SellerAbonnement/>} />
            <Route path="/admin/SellerAbonnementManager" element={<SellerAbonnementManagement/>} />
          </Route>
      </Routes>
  );
}

export default App;
