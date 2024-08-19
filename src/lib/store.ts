import { create } from "zustand";
import { persist } from "zustand/middleware";

// Definições de tipos (assumindo que essas são suas interfaces)
interface Product {
  id: string;
  name: string;
  price: number;
  img?: string;
  quantity: number;
}

interface CartType {
  products: Product[];
  totalItems: number;
  totalPrice: number;
}

interface ActionTypes {
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
  resetCart: () => void;
}

// Estado inicial
const INITIAL_STATE: CartType = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

// Criando a store do carrinho com persistência
export const useCartStore = create<CartType & ActionTypes>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      addToCart: (item) => {
        const { products, totalItems, totalPrice } = get();
        console.log("item received...")
        console.log(item)

        const productInState = products.find(
          (product) => product.id === item.id
        );
        
        if (productInState) {
          const updatedProducts = products.map((product) =>
            product.id === productInState.id
          ? {
            ...product,
            quantity: product.quantity + item.quantity,
            // Corrigindo o cálculo do preço
                  price:
                    product.price +
                    (item.price * item.quantity),
                  }
                  : product
                );
                set({
                  products: updatedProducts,
                  totalItems: totalItems + item.quantity,
                  totalPrice: totalPrice + item.price * item.quantity,
                });
              } else {
                set({
                  products: [...products, item],
                  totalItems: totalItems + item.quantity,
                  totalPrice: totalPrice + item.price * item.quantity,
                });
              }
              console.log("item added...")
            },
            
            removeFromCart: (item) => {
              const { products, totalItems, totalPrice } = get();
              console.log("item to be removed...")
              
              const productInState = products.find(
                (product) => product.id === item.id
              );
              
              if (!productInState) return;
              
              const updatedProducts = products
              .map((product) =>
            product.id === productInState.id
              ? {
                ...product,
                quantity: product.quantity - item.quantity,
                // Corrigindo o cálculo do preço
                price:
                product.price -
                (product.price / product.quantity) * item.quantity,
              }
              : product
            )
            .filter((product) => product.quantity > 0);
            
            set({
              products: updatedProducts,
              totalItems: totalItems - item.quantity,
              totalPrice: totalPrice - item.price,
            });
            console.log("item removed...")
          },
          
          resetCart: () => {
        set(INITIAL_STATE);
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
