import { useState } from "react";
import { createContext, ReactNode, useContext } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderType = {
  children: ReactNode
}

type CartItem = {
  id: number,
  quantity: number
}

type ShoppingCartContextType = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number, amount?: number) => void
  decreaseCartQuantity: (id: number, amount?: number) => void
  removeFromCart: (id: number) => void
  emptyCart: () => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContextType)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({ children }: ShoppingCartProviderType) {

  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const cartQuantity = cartItems.reduce((quantity, cartItem) => cartItem.quantity + quantity, 0)

  function openCart() {
    setIsOpen(true)
  }
  
  function closeCart() {
    setIsOpen(false)
  }

  function getItemQuantity(id: number): number {
    return cartItems.find(cartItem => cartItem.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number, amount: number = 1): void {
    setCartItems(prevItems => {
      if (cartItems.find(cartItem => cartItem.id === id) == null)
        return [...prevItems, { id, quantity: 1 }]
      
      return prevItems.map(cartItem => {
        if (cartItem.id === id) 
          return { ...cartItem, quantity: cartItem.quantity + amount }
        
        return cartItem
      })
    })
  }

  function removeFromCart(id: number): void {
    setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== id))
  }

  function emptyCart() :void {
    setCartItems(_prevItems => [])
  }

  function decreaseCartQuantity(id: number, amount: number = 1): void {
    setCartItems(prevItems => {
      const foundItem = cartItems.find(cartItem => cartItem.id === id)
      if (foundItem && foundItem.quantity <= amount)
        return prevItems.filter(cartItem => cartItem.id !== id)
      
      return prevItems.map(cartItem => {
        if (cartItem.id === id)
          return { ...cartItem, quantity: cartItem.quantity - amount }
        
        return cartItem
      })
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        emptyCart,
        openCart,
        closeCart,
        cartQuantity,
        cartItems
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}