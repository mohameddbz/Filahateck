import { Outlet } from "react-router-dom";
import Navbar from '../../common/Navbar';
import ButtonLangHome from './../../common/ButtonLangHome'

function HomeLayout() {
    return (
        <div>
            <Navbar/>
            <ButtonLangHome/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
  }
  
  export default HomeLayout;