import { useState } from 'react';

interface TransactionItem {
  id: string
  name: string
  quantity: number
  price: number
  brand?: string
  unitName?: string
  note?: string
}

export interface useTransactionItemsProps {
    items: TransactionItem[]
    addItem: (item: TransactionItem) => void
    updateNote: (id: string, note: string) => void
    updatePrice: (id: string, price: number) => void
    updateQuantity: (id: string, quantity: number) => void
    increaseQuantity: (id: string, amount: number) => void
    decreaseQuantity: (id: string, amount: number) => void
    removeItem: (id: string) => void
    removeAll: () => void
}

export const useTransactionItems = (): useTransactionItemsProps => {
  const [items, setItems] = useState<TransactionItem[]>([]);

  // Add a new item to the transaction
  const addItem = (item: TransactionItem) => {
    const findItem = items.find(i => i.id === item.id)
    if (findItem) {
        increaseQuantity(item.id, 1)
    }else{
        setItems(prevItems => [...prevItems, item])
    }
  };

  // Update the note of a specific item
  const updateNote = (id: string, note: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, note } : item
      )
    );
  }

  const updatePrice = (id: string, price: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, price } : item
      )
    );
  }

  const updateQuantity = (id: string, quantity: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  // Increase the quantity of a specific item
  const increaseQuantity = (id: string, amount: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      )
    );
  };

  // Decrease the quantity of a specific item
  const decreaseQuantity = (id: string, amount: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity >= amount
          ? { ...item, quantity: item.quantity - amount }
          : item
      )
    );
  };

  // Remove an item from the transaction
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const removeAll = () => {
    setItems([]);
  };


  return {
    items,
    addItem,
    updateNote,
    updatePrice,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    removeAll
  };
};
