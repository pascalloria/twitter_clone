const Input = (props) => {

    let inputElement;
    const inputClasses = [];

    if (!props.valid && props.touched){
        inputClasses.push("invalid")
    }
    
    switch (props.type) {
        case ("input"):
            inputElement = (

                <input 
                {...props.config}                 
                value={props.value} 
                onChange={props.changed} 
                className={inputClasses}  
                id = {props.id}
                />      
            )       
            break;
        case ("textarea"):
            inputElement = (
                <textarea 
                    {...props.config}
                    value={props.value} 
                    onChange={props.changed}
                    className={inputClasses}
                    id = {props.id}
                ></textarea>
            )
            break;  
        case ("select"):
            inputElement = (
                <select 
                    value={props.value}
                    onChange={props.changed}
                    className={inputClasses.join(" ")}
                    id = {props.id}
                >
                    {props.config.options.map(option =>(
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                        
                    ))}
                </select>
            )     
            
    }
    



    return ( 
    <div className="">
        <label htmlFor={props.id}>{props.label}</label>
        {inputElement} <br />
        {!props.valid && props.touched ?
        <span>{props.errorMessage}</span>
        : null
        }
        
    </div> );
}
 
export default Input;