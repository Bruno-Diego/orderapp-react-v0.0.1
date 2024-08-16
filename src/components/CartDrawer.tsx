import React from 'react';
import { useCartStore } from '@/lib/store'; // Ajuste o caminho conforme necessário
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer'; // Ajuste para o componente Drawer da sua biblioteca
import { Button } from '@/components/ui/button'; // Substitua pelo botão da sua biblioteca de UI
import { BsTrash } from 'react-icons/bs'; // Ícone para o botão de remoção

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CartDrawer = () => {
  // Obtenha o estado do carrinho da store
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();

  // Função para garantir que `totalPrice` e `product.price` sejam números
  const formatPrice = (price: string | number) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numericPrice.toFixed(2);
  };

  // Função para lidar com a remoção de um item
  const handleRemove = (product: Product) => {
    removeFromCart(product); // Ajuste a quantidade conforme necessário
  };

  return (
    <Drawer>
      <DrawerTrigger>
        Open Cart ({totalItems})
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className='text-white'>Your Shopping Cart</DrawerTitle>
          <DrawerDescription className='text-white'>Review the items you have added to your cart.</DrawerDescription>
        </DrawerHeader>
        <div className="drawer-body px-4">
          {totalItems === 0 ? (
            <p className='text-white'>Your cart is empty.</p>
          ) : (
            <ul className='text-white px-4'>
              {products.map((product) => (
                <li key={product.id} className="cart-item flex justify-between items-center py-2">
                  <div>
                    <span>{product.name}</span>
                    <span className='ml-2'>Quantity: {product.quantity}</span>
                    <span className='ml-2'>Price: ${formatPrice(product.price)}</span>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemove(product)}
                    className="ml-2"
                  >
                    <BsTrash className="h-5 w-5" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <DrawerFooter className='text-white'>
          <span>Total Price: ${formatPrice(totalPrice)}</span>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
