import { Outlet } from "react-router-dom";
import Navbar from '../../common/Navbar';
import ButtonLangHome from './../../common/ButtonLangHome';

function HomeLayout() {
    return (
        <div className="relative">
            <Navbar/>
            {/* Add fixed positioning to ButtonLangHome */}
            <div className="fixed top-2 right-2 z-50">
                <ButtonLangHome/>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
}
 
export default HomeLayout;