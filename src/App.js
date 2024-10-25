import ForgotPassPage from "./pages/motDePass/forgotPassPage";
import { LanguageProvider } from "./context/LanguageContext";
import LoginPage from "./pages/logi-in/LoginPage";
import ResetPassPage from "./pages/motDePass/ResetPassPage";
import SignUpPage from "./pages/signUp/signUpPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OffresPage from "./pages/Offres/offresPage";


function App() {
  return (
    <LanguageProvider>
      <Router>
        <div>
          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/ResetPassword" element={<ResetPassPage />} />
            <Route path="/ForgotPassword" element={<ForgotPassPage />} />
            <Route path="/compte/OffresPage" element={<OffresPage />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
