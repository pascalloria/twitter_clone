

// composant

import Header from "../../component/Header/Header";
import SideBar from "../../component/SideBar/SideBar";




const Layout = (props) => {
    return ( 
        <div className="row h-100 ">  
            <div className="col-2 col-xl-3 p-1 ">
                <Header user ={props.user}/>
            </div>     
            
            <div className=" mt-4 col-10  col-xl-6">
                {props.children}
            </div>
            <div className="col-3 d-none d-xl-inline">            
               <SideBar />
            </div>
        </div>
     );
}
 
export default Layout;