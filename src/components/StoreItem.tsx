import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utils/currencyFormat'
import { categoryTitle } from '../utils/categoryTitle'

type StoreItemType = {
  id: number,
  name: string,
  category: string,
  price: number,
  imgUrl: string
}

export function StoreItem({ id, name, category, price, imgUrl }: StoreItemType) {

  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
  const quantity = getItemQuantity(id)

  return (
    <Card className='h-100'>
      <Card.Img
        variant='top'
        height='200px'
        src={imgUrl}
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
          <span className='fs-2'>{name}</span>
          <span className='ms-2 text-muted'>
            <p>{formatCurrency(price)}</p>
            <p style={{fontSize:16, color:'#6E95D0'}}>{categoryTitle(category)}</p>
          </span>
        </Card.Title>
        <div className='mt-auto'>
          {
            !quantity ? (
              <Button className='w-100' onClick={() => increaseCartQuantity(id)} >+ Add to Cart</Button>
            ) : (
              <div className='d-flex align-items-center flex-column' style={{ gap: '.5rem' }}>
                <div className='d-flex align-items-center justify-content-center' style={{ gap: '.5rem' }}>
                  <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                  <div>
                    <span className='fs-3'>{quantity}</span> in cart
                  </div>
                  <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                </div>
                <Button onClick={() => removeFromCart(id)} variant='danger' size='sm' >Remove</Button>
              </div>
            )
          }
        </div>
      </Card.Body>
    </Card>
  )
}