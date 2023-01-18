import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import { Store } from './pages/Store'
import { Checkout } from './pages/Checkout'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className='mb-4' >
        <Routes>
          <Route path='/' element={<Store />} />
          <Route path='/store' element={<Store />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
