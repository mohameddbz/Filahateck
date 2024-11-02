import ForgotPassPage from "./pages/motDePass/forgotPassPage";
import { LanguageProvider } from "./context/LanguageContext";
import LoginPage from "./pages/logi-in/LoginPage";
import ResetPassPage from "./pages/motDePass/ResetPassPage";
import SignUpPage from "./pages/signUp/signUpPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OffresPage from "./pages/Offres/offresPage";
import MainLayout from "./pages/main/MainLayout"
import MarketplacePage from "./pages/main/marketPlacePage";
import ProductSubmissionPage from "./pages/main/ProductSubmissionPage";
import StockManagementPage from "./pages/main/StockManagementPage";
import HomePage from "./pages/homePage/HomePage";
import MessagingPage from "./pages/main/MessagingPage";


function App() {
  return (
    <LanguageProvider>
      <Router>
        <div>
          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/homePage"  element={<HomePage/>} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/ResetPassword" element={<ResetPassPage />} />
            <Route path="/ForgotPassword" element={<ForgotPassPage />} />
            <Route path="/compte/OffresPage" element={<OffresPage />} />
            
            <Route path="/user/ami" element={<MainLayout />} />
            <Route path="/user/marketplace" element={<MarketplacePage />} />
            <Route path="/user/product-submission" element={<ProductSubmissionPage />} />
            <Route path="/user/stock-management" element={<StockManagementPage />} />
            <Route path="/user/Messaging-page" element={<MessagingPage/>} /> 
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
