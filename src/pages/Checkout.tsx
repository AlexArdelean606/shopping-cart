import { Button, Stack } from "react-bootstrap"
import { CheckoutItem } from "../components/CheckoutItem"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utils/currencyFormat"
import storeItems from '../data/items.json'
import { useState } from "react"

export function Checkout() {
  
  const { cartItems, closeCart, emptyCart } = useShoppingCart()
  
  const [purchased, setPurchased] = useState<boolean>(false);

  function purchase() {
    emptyCart();
    setPurchased(true);
  }

  return (
    <>
      <Stack direction='horizontal' className='d-flex align-items-center'>
        <div className='me-auto'>
          <h1>Checkout</h1>
          <span style={{fontSize:'1.25rem'}}>
            Total{' '}
          </span>
          <span style={{fontSize:'1.25rem'}}>
            { formatCurrency(cartItems.reduce((total, cartItem) => {
              const item = storeItems.find(storeItem => storeItem.id === cartItem.id)
              return total + (item?.price || 0) * cartItem.quantity
            }, 0 ))}
          </span>
        </div>
        <Button style={{marginRight:'5rem', padding:'1rem 5rem'}} variant='outline-danger' onClick={() => emptyCart()}>Empty Cart</Button>
        <Button style={{marginRight:'5rem', padding:'1rem 5rem'}} disabled={cartItems.length < 1} variant='outline-success' onClick={() => purchase() }>Purchase</Button>
      </Stack>
      {cartItems.map((cartItem) =>
        <CheckoutItem key={cartItem.id} {...cartItem}/>
      ) }
      {purchased && 
        <Stack direction='horizontal' className='d-flex align-items-center'>
          <span style={{marginRight:'50vw', color:'#1BE12F'}} >
            Purchase complete!
          </span>
        </Stack>
      }
    </>
  )
}