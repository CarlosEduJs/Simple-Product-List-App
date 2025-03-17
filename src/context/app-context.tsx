"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { itemsData } from "../constants/items-data";
import { ItemProps } from "@/interfaces/item";

interface AppContextProps {
  itemsDisponiveis: ItemProps[];
  purchasedItems: ItemProps[];
  addItem: (item: ItemProps) => void;
  removeItem: (item: ItemProps) => void;
  clearCart: () => void;
  increaseQuantity: (item: ItemProps) => void;
  decreaseQuantity: (item: ItemProps) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [itemsDisponiveis, setItemsDisponiveis] = useState<ItemProps[]>(
    itemsData as ItemProps[]
  );
  const [purchasedItems, setPurchasedItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    setItemsDisponiveis(itemsData as ItemProps[]);
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setPurchasedItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Err parsing cart", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  const addItem = useCallback((item: ItemProps) => {
    setPurchasedItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 0) + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  }, []);

  const removeItem = useCallback((item: ItemProps) => {
    setPurchasedItems((prevItems) =>
      prevItems.filter((purchasedItem) => purchasedItem.id !== item.id)
    );
  }, []);

  const clearCart = useCallback(() => {
    setPurchasedItems([]);
  }, []);

  const increaseQuantity = useCallback((item: ItemProps) => {
    setPurchasedItems((prevItems) =>
      prevItems.map((purchasedItem) =>
        purchasedItem.id === item.id
          ? { ...purchasedItem, quantity: (purchasedItem.quantity || 0) + 1 }
          : purchasedItem
      )
    );
  }, []);

  const decreaseQuantity = useCallback((item: ItemProps) => {
    setPurchasedItems((prevItems) => {
      const updatedItems = prevItems.map((purchasedItem) =>
        purchasedItem.id === item.id
          ? { ...purchasedItem, quantity: (purchasedItem.quantity || 0) - 1 }
          : purchasedItem
      );

      return updatedItems.filter(
        (purchasedItem) => purchasedItem.quantity! > 0
      );
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        itemsDisponiveis,
        purchasedItems,
        addItem,
        removeItem,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
