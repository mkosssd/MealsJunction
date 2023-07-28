import { useReducer } from 'react'
import CartContext from './Cart-Context'
const defCartState={
    items:[],
    totalAmount:0
}
const CartReducer=(state,action)=>{
    if(action.type==='ADD_ITEM'){
        const newTotalAmount = state.totalAmount + action.item.price 
        const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id)
        const existingItem = state.items[existingItemIndex]
        let updatedItems;
        if(existingItem){
          const updatedItem={
                ...existingItem,
                amount:existingItem.amount + 1
            }
            updatedItems=[...state.items]
            updatedItems[existingItemIndex]=updatedItem
        }else{
            updatedItems=state.items.concat(action.item)
        }
        // const finalItems=state.items.concat(action.item)
        return {
            items:updatedItems,
            totalAmount:newTotalAmount,

        }
    
    }
    if(action.type==='REMOVE_ITEM'){
        const existingItemIndex = state.items.findIndex((item)=>item.id===action.id)
        const existingItem = state.items[existingItemIndex]
        const updatedTotalAmount=state.totalAmount - existingItem.price
        let updatedItems;
        if(existingItem.amount===1){
            updatedItems= state.items.filter(item=>item.id!==action.id)
        }else{
            const updatedItem= {...existingItem,amount:existingItem.amount-1}
            updatedItems = [...state.items]
            updatedItems[existingItemIndex]=updatedItem
        }
        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    return defCartState
}


const CartProvider=props=>{
    const [cartState,dispatchCartAction] = useReducer(CartReducer,defCartState)
    const addItemHandler=item=>{
        dispatchCartAction({type:'ADD_ITEM',item:item})
    }
    const removeItemHandler=id=>{
        dispatchCartAction({type:'REMOVE_ITEM',id:id})
    }
    const cartContext =  {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemHandler,
        removeItem:removeItemHandler 
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider