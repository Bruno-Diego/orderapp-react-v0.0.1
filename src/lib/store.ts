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

        const productInState = products.find(
          (product) => product.id === item.id
        );

        if (productInState) {
          const newPrice = item.price * item.quantity
          const updatedProducts = products.map((product) =>
            product.id === item.id
              ? {
                  ...product,
                  quantity: product.quantity + item.quantity,
                  price: product.price + newPrice,
                }
              : product
          );

          set({
            products: updatedProducts,
            totalItems: totalItems + item.quantity,
            totalPrice: totalPrice + item.price * item.quantity,
          });
        } else {
          const newPrice = item.price * item.quantity
          item.price = newPrice
          set({
            products: [...products, item],
            totalItems: totalItems + item.quantity,
            totalPrice: totalPrice + item.price,
          });
        }
      },

      removeFromCart: (item) => {
        const { products, totalItems, totalPrice } = get();
      
        // Verifica se o produto existe no estado atual
        const productInState = products.find(
          (product) => product.id === item.id
        );
      
        if (!productInState) return;
      
        // Remove completamente o produto da lista de produtos
        const updatedProducts = products.filter(
          (product) => product.id !== productInState.id
        );
      
        // Atualiza o estado removendo o item completamente
        set({
          products: updatedProducts,
          totalItems: totalItems - productInState.quantity, // Reduz a quantidade total
          totalPrice: totalPrice - productInState.price, // Reduz o preço total
        });
      },
      
      // removeFromCart: (item) => {
      //   const { products, totalItems, totalPrice } = get();

      //   const productInState = products.find(
      //     (product) => product.id === item.id
      //   );

      //   if (!productInState) return;

      //   const updatedProducts = products
      //     .map((product) =>
      //       product.id === productInState.id
      //         ? {
      //             ...product,
      //             quantity: product.quantity - item.quantity,
      //             price:
      //               product.price -
      //               (product.price / product.quantity) * item.quantity,
      //           }
      //         : product
      //     )
      //     .filter((product) => product.quantity > 0);

       

      //   set({
      //     products: updatedProducts,
      //     totalItems: totalItems - item.quantity,
      //     totalPrice: totalPrice - item.price * item.quantity,
      //   });
      // },

      resetCart: () => {
        set(INITIAL_STATE);
      },
    }),
    {
      name: "cart",
      skipHydration: true,
    }
  )
);
