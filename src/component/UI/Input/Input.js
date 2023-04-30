import { Col, Form,FormGroup, Row } from "react-bootstrap";

const Input = (props) => {

    // Composant qui gere les différents type d'inputs utilisé dans les formulaires de ce sites.
    let inputElement;
    const inputClasses = [];

    // Permet d'ajouter la classe invalid si un input ne correspond pas au régle editer dans le formulaire
    if (!props.valid && props.touched){
        inputClasses.push("invalid")
    }
    
    // Gere les différents type d'input (input , texteArea , select...)
    switch (props.type) {
        case ("input"):
            inputElement = (

                <Form.Control 
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
                <Form.Control
                    as="textarea"
                    {...props.config}
                    value={props.value} 
                    onChange={props.changed}
                    className={inputClasses}
                    id = {props.id}
                ></Form.Control >
            )
            break;  
        case ("select"):
            inputElement = (
                <Form.Select  
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
                </Form.Select >
            ) 
            break;  
        default :
            break   ; 
            
    }
    



    return ( 
    <FormGroup className="mb-4" as={Row}>
        <Form.Label  column sm={4}  htmlFor={props.id}>{props.label}</Form.Label>
        <Col sm={8}>{inputElement} 
        </Col>
        
        {/* Affiche le message prévue en cas de nos respect de regles du formulaire */}
        {!props.valid && props.touched ?
        <Form.Text>{props.errorMessage}</Form.Text>
        : null
        }        
        
    </FormGroup> );
}
 
export default Input;