import { Fragment, useContext, useState } from 'react'
import Modal from '../UI/Modal/Modal'
import styles from './Cart.module.css'
import CartContext from '../../Store/Cart-Context'
import CartItem from './CartItem'
import Checkout from './Checkout'
import Loader from '../UI/Loader/Loader'
const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [error, setError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const removeItem = id => {
    cartCtx.removeItem(id)
  }
  const addItem = item => {
    cartCtx.addItem(item)
  }
  const orderHandler = () => {
    setIsCheckout(true)
  }
  const submitOrderHandler = async userdata => {
    console.log(userdata)
    setIsSubmitting(true)
    try {
      const response = await fetch(
        'https://recipe-book-project-udem-ad2cc-default-rtdb.firebaseio.com/orderDB.json',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: userdata,
            orderedItem: cartCtx.items
          })
        }
        )
        setIsSubmitting(false)
      if (!response.ok) {
        setError(true)
        throw new Error('ORDER CANNOT BE PLACED!')
        
      }
    } catch (error) {
      setError('Order cannot be placed due to server error!')
      setIsSubmitting(false)
      return
    }
    setDidSubmit(true)
    setIsCheckout(false)
    
  }
  const cartCtx = useContext(CartContext)
  const hasItems = cartCtx.items.length > 0
  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeItem.bind(null, item.id)}
          onAdd={addItem.bind(null, item)}
        />
      ))}
    </ul>
  )
  const buttons = (
    <div className={styles.actions}>
      <button onClick={props.onCart} className={styles['button--alt']}>
        CANCEL
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          ORDER
        </button>
      )}
    </div>
  )
  if (error) {
    return <Modal>{error}</Modal>
  }
  const cartContent = (
    <Fragment>
      {!isCheckout && cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>₹ {cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onCart} />
      )}
      {!isCheckout && buttons}
    </Fragment>
  )
  const didSubmitModalContent = (
    <Fragment>
      <p style={{fontWeight:'900'}}>Order Placed Successfully!</p>
      <div className={styles.actions}>
      <button className={styles.button} onClick={props.onCart}>
        Close
      </button>
    </div>
    </Fragment>
  );
  return (
    <Modal key={cartItems.id} onCart={props.onCart}>
        {!isSubmitting && !didSubmit && cartContent}
      {isSubmitting && <Loader/>}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}
export default Cart
