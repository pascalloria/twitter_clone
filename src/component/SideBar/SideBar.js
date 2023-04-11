
// Components

import Footer from "./Footer/Footer";

const SideBar = () => {
    return ( 
        <div className="d-flex flex-column justify-content-between h-100 p-2">
            <div><h2>SideBar</h2></div>

            <div className="content flex-grow-1">
                    Test
            </div>
            
            <div>
                <Footer />    
            </div>
           
        </div>
        
     );
}
 
export default SideBar;