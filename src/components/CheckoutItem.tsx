import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from '../data/items.json'
import { categoryTitle } from '../utils/categoryTitle'
import { formatCurrency } from '../utils/currencyFormat'

type CheckoutItemType = {
  id: number
  quantity: number
}

export function CheckoutItem({id, quantity}:CheckoutItemType){
  
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()

  const item = storeItems.find(storeItem => storeItem.id === id)

  if(item == null) return null

  return (
    <Stack direction='horizontal' className='d-flex align-items-center'>
      <img
        src={item.imgUrl}
        style={{ width: '320px', height: '200px', objectFit: 'cover'}}
      />
      <div className='me-auto' style={{margin:'0 2rem'}}>
        <div style={{fontSize:'1.5rem'}}>
          {item.name}
        </div>
        <div style={{fontSize:'1rem', color:'#6E95D0'}}>{categoryTitle(item.category)}</div>
      </div>
      <div className='muted-text' style={{fontSize: '1.2rem', marginRight: '5rem'}}>
          { formatCurrency(item.price) }
      </div>
      <div style={{marginRight: '5rem'}}>
        <Button variant='outline-danger' onClick={() => decreaseCartQuantity(id)}>-</Button>
        <span style={{fontSize:'1.2rem', color:'rgb(100,100,255)', margin:'0 .5rem'}}>{quantity}</span>
        <Button variant='outline-success' onClick={() => increaseCartQuantity(id)}>+</Button>
      </div>
      <div style={{marginRight: '3rem'}}> {formatCurrency(item.price * quantity)} </div>
      <Button variant='outline-danger' onClick={() => removeFromCart(id)}>Remove from cart</Button>
    </Stack>
  )
}