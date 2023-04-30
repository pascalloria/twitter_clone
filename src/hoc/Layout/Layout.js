// libraries
import { ToastContainer } from "react-toastify";

// Component
import Header from "../../component/Header/Header";
import SideBar from "../../component/SideBar/SideBar";




const Layout = (props) => {
    // composant qui engloble le contenue.
    // avec un Header et un sideBar
    return ( 
        <div className="row   my-2 my-xl-4 ">  
            <div className="col-2 col-xl-3 p-1 ">
                <Header />
            </div>     
            
            <div className="border-start border-2 pt-4 ps-2 h-100 col-10 col-xl-6 overflow-auto">
                {props.children}
            </div>
            <div className="col-3  d-none d-xl-inline">            
               <SideBar />
            </div>
            <ToastContainer position="top-center"
                autoClose={3000} />
        </div>
     );
}
 
export default Layout;