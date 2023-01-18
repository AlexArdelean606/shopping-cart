import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from '../data/items.json'
import { formatCurrency } from '../utils/currencyFormat'

type CartItemType = {
  id: number
  quantity: number
}

export function CartItem({id, quantity}:CartItemType){
  
  const { removeFromCart } = useShoppingCart()

  const item = storeItems.find(storeItem => storeItem.id === id)

  if(item == null) return null

  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
      <img
        src={item.imgUrl}
        style={{ width: '125px', height: '75px', objectFit: 'cover'}}
      />
      <div className='me-auto'>
        <div>
          {item.name} {quantity > 1 && <span style={{fontSize:'.95rem', color:'rgb(100,100,255)' }}>x{quantity}</span>}
        </div>
        <div className='muted-text' style={{fontSize: '.75rem'}}>
          { formatCurrency(item.price) }
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)} </div>
      <Button variant='outline-danger' size='sm' onClick={() => removeFromCart(id)}>&times;</Button>
    </Stack>
  )
}