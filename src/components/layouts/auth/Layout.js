import { Outlet } from "react-router-dom";
import Navbar from '../../common/Navbar';
import ButtonLang from './../../common/ButtonLang'

function AuthLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <ButtonLang/>
            <div className="flex-grow flex">
                <Outlet/>
            </div>
        </div>
    );
  }
  
  export default AuthLayout;