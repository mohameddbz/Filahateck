import { LanguageProvider } from "./context/LanguageContext";
import LoginPage from "./pages/logi-in/LoginPage";
import SignUpPage from "./pages/signUp/signUpPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <LanguageProvider>
      <Router>
        <div>
          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
