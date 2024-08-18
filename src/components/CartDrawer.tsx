import React from 'react';
import { useCartStore } from '@/lib/store'; // Regola il percorso secondo necessità
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer'; // Adatta per il componente Drawer della tua libreria
import { Button } from '@/components/ui/button'; // Sostituisci con il pulsante della tua libreria di UI
import { BsTrash } from 'react-icons/bs'; // Icona per il pulsante di rimozione

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CartDrawer = () => {
  // Ottieni lo stato del carrello dallo store
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();

  // Funzione per garantire che `totalPrice` e `product.price` siano numeri
  const formatPrice = (price: string | number) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numericPrice.toFixed(2);
  };

  // Funzione per gestire la rimozione di un elemento
  const handleRemove = (product: Product) => {
    removeFromCart(product); // Regola la quantità secondo necessità
  };

  return (
    <Drawer>
      <DrawerTrigger>
        Apri Carrello ({totalItems})
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className='text-white'>Il tuo carrello</DrawerTitle>
          <DrawerDescription className='text-white'>Rivedi gli articoli che hai aggiunto al carrello.</DrawerDescription>
        </DrawerHeader>
        <div className="drawer-body px-4">
          {totalItems === 0 ? (
            <p className='text-white'>Il tuo carrello è vuoto.</p>
          ) : (
            <ul className='text-white px-4'>
              {products.map((product) => (
                <li key={product.id} className="cart-item flex justify-between items-center py-2">
                  <div>
                    <span>{product.name}</span>
                    <span className='ml-2'>Quantità: {product.quantity}</span>
                    <span className='ml-2'>Prezzo: €{formatPrice(product.price)}</span>
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
          <span>Prezzo Totale: €{formatPrice(totalPrice)}</span>
          <DrawerClose>
            <Button variant="outline">Chiudi</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
