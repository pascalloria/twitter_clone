

// composant

import Header from "../../component/Header/Header";
import SideBar from "../../component/SideBar/SideBar";




const Layout = (props) => {
    return ( 
        <div className="row h-100 ">  
            <div className="col-2 col-md-3 p-1 ">
                <Header user ={props.user}/>
            </div>     
            
            <div className="col-10  col-md-6 border border-2">
                {props.children}
            </div>
            <div className="col-3 d-none d-md-inline border border-2">            
               <SideBar />
            </div>
        </div>
     );
}
 
export default Layout;