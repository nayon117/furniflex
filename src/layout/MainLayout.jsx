import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
        <div className='max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 '>
              <Outlet ></Outlet>
        </div>
        <Footer />
        </div>
    )
}
export default MainLayout;