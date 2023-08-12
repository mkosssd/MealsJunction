import { useRef, useState } from 'react'
import styles from './Checkout.module.css'
const isEmpty= value=>value.trim()===''
const isFiveChars = value=>value.trim().length >=5
const Checkout = props => {
 const[formValidity,setFormValidity] = useState({
  name:true,
  street:true,
  city:true,
  pinCode:true
 })
  const confirmHandler = event => {
    event.preventDefault()
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredcity = cityInputRef.current.value
    const enteredpinCode = pinCodeInputRef.current.value
    const isNameValid = !isEmpty(enteredName)
    const isStreetValid = !isEmpty(enteredStreet)
    const iscityValid = !isEmpty(enteredcity)
    const ispinCodeValid = isFiveChars(enteredpinCode)
    setFormValidity({
      name:isNameValid,
      street:isStreetValid,
      city:iscityValid,
      pinCode:ispinCodeValid

    })
    const formIsValid = isNameValid && isStreetValid && ispinCodeValid && iscityValid
    if(!formIsValid){
      return
    }
    props.onConfirm({name:enteredName,
      city:enteredcity,
      street:enteredStreet,
      pinCode:enteredpinCode})
  }
  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const cityInputRef = useRef()
  const pinCodeInputRef = useRef()
  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={`${styles.control} ${formValidity.name?'':styles.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={`${styles.control} ${formValidity.street?'':styles.invalid}`}>
        <label htmlFor='street'>Address</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={`${styles.control} ${formValidity.city?'':styles.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={`${styles.control} ${formValidity.pinCode?'':styles.invalid}`}>
        <label htmlFor='pinCode'>Pincode</label>
        <input type='text' id='pinCode' ref={pinCodeInputRef} />
        {!formValidity.pinCode && <p>Please enter a valid pin.</p>}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}  >Confirm</button>
      </div>
    </form>
  )
}
export default Checkout
