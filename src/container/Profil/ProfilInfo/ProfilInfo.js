const ProfilInfo = (props) => {
    return (  
    
        <div className="row border border-2 p-2 align-items-center">
            <div className="col-12 col-xl-5 h3 text-xl-start">{props.label} :</div>
            <div className=" col-12 col-xl-7">{props.info}</div>              
        </div>                  
    
    );
}
 
export default ProfilInfo;