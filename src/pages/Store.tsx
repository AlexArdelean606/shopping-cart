import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { StoreItem } from '../components/StoreItem'
import storeItems from '../data/items.json'

export function Store() {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className='g-3' >
        {storeItems.map((storeItem, idx) => (
          <Col key={idx}>
            <StoreItem {...storeItem} />
          </Col>
        ))}
      </Row>
    </>
  )
}