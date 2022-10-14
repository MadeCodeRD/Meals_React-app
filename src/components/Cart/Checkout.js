import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim().length === 0;
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {

  const [formInputsValidty, setFormInputsValidity]= useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });  

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredPostalCodeIsValid,
        postalCode: enteredCityIsValid
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

      if(!formIsValid){
       return;
      }

      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city:enteredCity
      })
  };

  const addStyleToDiv=(inputValidity)=>{
    return `${classes.control} ${!inputValidity ? classes.invalid : ''}`;
  };


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={addStyleToDiv(formInputsValidty.name)}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidty.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={addStyleToDiv(formInputsValidty.street)}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidty.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={addStyleToDiv(formInputsValidty.postalCode)}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidty.postalCode && <p>Please enter a valid Postal Code.</p>}
      </div>
      <div className={addStyleToDiv(formInputsValidty.city)}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidty.city && <p>Please enter a valid City.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
