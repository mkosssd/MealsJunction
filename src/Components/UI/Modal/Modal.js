import styles from './Modal.module.css'
import ReactDOM from 'react-dom'
const Backdrop=(props)=>{
    return <div onClick={props.onCart} className={styles.backdrop}></div>
}
const ModalOverlay=(props)=>{
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
}
const portalElement = document.getElementById('overlays')
const Modal=(props)=>{
    return <>

    {ReactDOM.createPortal(<Backdrop onCart={props.onCart}/>,portalElement)}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </>
}
export default Modal