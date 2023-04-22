

// composant

import Header from "../../component/Header/Header";
import SideBar from "../../component/SideBar/SideBar";

import { ToastContainer } from "react-toastify";


const Layout = (props) => {
    return ( 
        <div className="row  my-2 my-xl-4 ">  
            <div className="col-2 col-xl-3 p-1 ">
                <Header />
            </div>     
            
            <div className=" pt-4 h-100 col-10 a col-xl-6 overflow-auto">
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