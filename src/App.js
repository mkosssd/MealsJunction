import { useState } from "react";
import Cart from './Components/Cart/Cart'
import Header from "./Components/Layout/Header/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./Store/Cart-Provider";

function App() {
  const [cart,showCart] = useState(false)
  const onCart=()=>{
    showCart(!cart)
  }
  return (
    <CartProvider>
      {cart && <Cart  onCart={onCart}/>}
    <Header onCart={onCart} />
    <main>
      <Meals />
    </main>
  </CartProvider>
  );
}

export default App;
