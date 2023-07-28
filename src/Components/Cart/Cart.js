import { useContext } from 'react'
import Modal from '../UI/Modal/Modal'
import styles from './Cart.module.css'
import CartContext from '../../Store/Cart-Context'
import CartItem from './CartItem'
const Cart = props => {
  const removeItem = (id) => {
    cartCtx.removeItem(id)
  }
  const addItem = (item) => {
    cartCtx.addItem(item)
  }
  const cartCtx = useContext(CartContext)
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
  const hasItems = cartCtx.items.length > 0
  return (
    <Modal key={cartItems.id} onCart={props.onCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>₹ {cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onCart} className={styles['button--alt']}>
          CANCEL
        </button>
        {hasItems && <button className={styles.button}>ORDER</button>}
      </div>
    </Modal>
  )
}
export default Cart
