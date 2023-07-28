import { useContext, useEffect, useState } from 'react'
import CartIcon from '../../UI/CartIcon/CartIcon'
import CartContext from '../../../Store/Cart-Context'
import styles from './HeaderCartButton.module.css'
const HeaderCartButton = props => {
  const [btnHighlighted, setBtnHighligted] = useState(false)
  const cartCtx = useContext(CartContext)
  const { items } = cartCtx
  const numberOfItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)
  const btnClasses = `${styles.button} ${btnHighlighted ? styles.bump : ''}`
  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setBtnHighligted(true)
   const timer =  setTimeout(()=>{ 
      setBtnHighligted(false)
    },300)
    return ()=>{

      clearTimeout(timer)
    }
  }, [items])
  return (
    <button className={btnClasses} onClick={props.props.onCart}>
      <span className={styles.icon}>
        <CartIcon />{' '}
      </span>
      <span> CART </span>
      <span className={styles.badge}>{numberOfItems}</span>
    </button>
  )
}
export default HeaderCartButton
