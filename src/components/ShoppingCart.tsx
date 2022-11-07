import Offcanvas from 'react-bootstrap/Offcanvas'
import Stack from 'react-bootstrap/Stack'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utils/currencyFormat'
import { CartItem } from './CartItem'
import storeItems from '../data/items.json'

type ShoppingCartType = {
  isOpen: boolean
}

export function ShoppingCart({isOpen}:ShoppingCartType) {
  
  const { closeCart, cartItems } = useShoppingCart()

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(cartItem => 
            <CartItem key={cartItem.id} {...cartItem} />
          ) }
          <div
            className='ms-auto fw-bold fs-5'
          >
          Total{' '}
          { formatCurrency(cartItems.reduce((total, cartItem) => {
            const item = storeItems.find(storeItem => storeItem.id === cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
          }, 0 ))}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}