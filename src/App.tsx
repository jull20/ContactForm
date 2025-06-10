import React, { useState, type ChangeEvent } from 'react'
import './css/App.css'

export default function App() {
  const [hiddenProps, setHiddenProps] = useState("hidden");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName:  "",
    email:     "",
    queryType: "",
    message:   "",
    checkbox:  ""
  });
  const [error, setError] = useState({
    firstName: "",
    lastName:  "",
    email:     "",
    queryType: "",
    message:   "",
    checkbox:  ""
  });

  let validateForm = (name: string, value: string) => {
    let errorText = "";
    switch(name){
      case "firstName":
      case "lastName":
      case "message":
        if(!value) errorText = "This field is required"  
        break;
      case "email":
        if(!value) errorText = "This field is required"
        else if(!(/\S+@\S+\.\S+/).test(value)) errorText = "Please enter a valid email address"
        break;
      case "queryType":
        if(!value) errorText = "Please select a query type"  
        break;
      case "checkbox":
        if(!value) errorText = "To submit this form, please consent to being contacted"  
        break;        
    }
    setError(error => ({...error, [name]: errorText}));
    return !(errorText=="")
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
    console.log("handleChange")
    let newValue = event.target.value;
    if(event.target.name == "checkbox" && !event.target.checked){
      newValue = "";
    }
    setFormData({...formData, [event.target.name]: newValue}); 
    validateForm(event.target.name, newValue)
  }

  const handleSubmit = () => {
    let isEmpty;
    for(let field in formData){
      isEmpty = validateForm(field, formData[field])
    }
    if(!isEmpty){
      setHiddenProps("");
      setTimeout(() => { setHiddenProps("hidden"); }, 3000);
      setFormData({
        firstName: "",
        lastName:  "",
        email:     "",
        queryType: "",
        message:   "",
        checkbox:  ""
      })
    }
  }
  
  return (
    <main className="main">
      <div className="mainContainer">
        <form className='form' action={handleSubmit}>
          <fieldset className='mainFieldset'>
            <legend className='contactUsLegend'>Contact Us</legend>

            <Input 
                type="text" 
                name="firstName" 
                id="firstName" 
                errorText={error.firstName}
                onChange={handleChange}
            > 
              First Name <span className='star'>*</span>
            </Input>
            <Input 
                type="text" 
                name="lastName" 
                id="lastName" 
                errorText={error.lastName}
                onChange={handleChange}
            >
                Last Name <span className='star'>*</span>
            </Input>
            <Input 
                type="email" 
                name="email" 
                id="email" 
                errorText={error.email}
                onChange={handleChange}
            >
                Email Address <span className='star'>*</span>
            </Input>

            <fieldset className='queryTypeFieldset'>
              <legend className='queryTypeLegend'>Query Type <span className='star'>*</span></legend>
              <Input 
                  type='radio' 
                  name="queryType" 
                  id="generalEnquiry" 
                  inputValue="generalEnquiry"
                  onChange={handleChange}
              >
                  General Enquiry
              </Input>
              <Input 
                  type='radio' 
                  name="queryType" 
                  id="supportRequest" 
                  inputValue="supportRequest"
                  onChange={handleChange}
              >
                  Support Request
              </Input>
              <span className={(error.queryType)?"errorMessage":" hidden"} id='messageError'>This field is required</span>
            </fieldset>
            <div className="inputEl messageContainer">
              <label className='label' htmlFor="message">Message: <span className='star'>*</span></label>
              <textarea 
                  className={(error.message)?"errorState":""} 
                  id="message" 
                  name="message" 
                  rows={3}
                  onChange={handleChange}
              ></textarea>
              <span     
                  className={(error.message)?"errorMessage":" hidden"} 
                  id='messageError'>{error.message}</span>
            </div>
          </fieldset>
          <Input 
              type='checkbox' 
              name="checkbox" 
              id="checkbox" 
              inputValue='consent' 
              errorText={error.checkbox}
              onChange={handleChange}
          >
              I consent to being contacted by the team <span className='star'>*</span>
          </Input>
          
          <button type="submit" className='submitBtn'>Submit</button>
        </form>
        <div className={"isSentMessageContainer " + hiddenProps}>
          <div className="img"><img src="icon-success-check.svg" alt="message has been delivered"/></div>
          <h1 className="title">Message Sent!</h1>
          <p className='description'>Thanks for completing the form. We’ll be in touch soon!</p>
        </div>
      </div>
    </main>
  )
}

type TextInputProps = {
  children: React.ReactNode;
  name: string; 
  id: string;
  type:string;
  errorText?: string;
  inputValue?:string;
  onChange: (event: React.ChangeEvent<HTMLInputElement >) => void;
}

function Input({name, id, type, children, onChange, errorText="", inputValue=""}:TextInputProps){
  let inputAttributesValue = (inputValue !== "") ? {value: inputValue} : {};
  return (
    <div className='inputEl'>
      <label className='label' htmlFor={name}>{children}</label>
      <input 
        className={ (errorText) ? "errorState" : "" } 
        id={id} 
        name={name} 
        type={type} 
        onChange={onChange} 
        {...inputAttributesValue}
      />
      <span className={(errorText)?"errorMessage":" hidden"} id={name+'isEmpty'}>{errorText}</span>
    </div>
  )
}