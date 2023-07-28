import { Fragment } from 'react'
import meals from '../../../assets/meals.jpg'
import styles from './Header.module.css'
import HeaderCartButton from '../HeaderCartButton/HeaderCartButton'
const Header=(props)=>{
    return <Fragment>
        <header className={styles.header}>
            <h1>Meals Junction</h1>
            <HeaderCartButton props={props}/>
        </header>
        <div className={styles['main-image']}>
            <img src={meals} alt='Meals on Table'/>
        </div>
    </Fragment>
}
export default Header