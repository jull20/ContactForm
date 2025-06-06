import React, { useState } from 'react'
import './css/App.css'

export default function App() {
  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if(checkFormEmpty()){
    // }
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries(formData);
    console.log(data)
  }
  const checkFormEmpty = (formData: FormData) => {
    let data = Object.fromEntries(formData);
    console.log(data)
    // return false;
  }
  return (
    <main className="main">
      <div className="mainContainer">
        <form className='form' action={checkFormEmpty}>
          <fieldset className='mainFieldset'>
            <legend className='contactUsLegend'>Contact Us</legend>
            <Input type="text" name="firstName" id="firstName">First Name <span className='star'>*</span></Input>
            <Input type="text" name="lastName" id="lastName">Last Name <span className='star'>*</span></Input>
            <Input type="email" name="email" id="email">Email Address <span className='star'>*</span></Input>
            <fieldset className='queryTypeFieldset'>
              <legend className='queryTypeLegend'>Query Type <span className='star'>*</span></legend>
              <Input type='radio' name="queryType" id="generalEnquiry" inputValue="generalEnquiry">General Enquiry</Input>
              <Input type='radio' name="queryType" id="supportRequest" inputValue="supportRequest">Support Request</Input>
            </fieldset>
            <div className="inputEl messageContainer">
              <label className='label' htmlFor="message">Message: <span className='star'>*</span></label>
              <textarea id="message" name="message" rows={3}></textarea>
            </div>
          </fieldset>
          <Input type='checkbox' name="checkbox" id="checkbox">I consent to being contacted by the team <span className='star'>*</span></Input>
          
          <button type="submit" className='submitBtn'>Submit</button>
        </form>
      </div>
    </main>
  )
}

type TextInputProps = {
  children: React.ReactNode;
  name: string; 
  id: string;
  type:string;
  inputValue?:string;
}

function Input({name, id, type, children, inputValue=""}:TextInputProps){
  let inputAttributesValue = (inputValue !== "") ? {value: inputValue} : {};
  return (
    <div className='inputEl'>
      <label className='label' htmlFor={name}>{children}</label>
      <input type={type} id={id} name={name} {...inputAttributesValue}/>
    </div>
  )
}