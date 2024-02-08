import { create } from 'zustand'

import { ProductProps } from '@/utils/data/products'

import * as cartInMemory from './helpers/cart-in-memory'

export interface ProductCartProps extends ProductProps {
  quantity: number
}

interface StateProps {
  products: ProductCartProps[]
  add: (product: ProductProps) => void
}

export const useCartStore = create<StateProps>((set) => ({
  products: [],

  add: (product: ProductProps) => {
    set((state) => ({
      products: cartInMemory.add(state.products, product),
    }))
  },
}))
