import { ItemProps } from "@/interfaces/item";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAppContext } from "@/context/app-context";
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function Item({ item }: { item: ItemProps }) {
  return (
    <div
      className="flex flex-col max-sm:w-full max-sm:px-4 max-md:w-fit max-w-md focus-within:outline focus-within:ring-2 focus-within:ring-primary rounded-md"
      tabIndex={0}
      aria-label={`Item: ${item.name}, Price: ${item.price}`}
      role="list-item"
    >
      <div className="flex flex-col">
        <Image
          src={item.image}
          width={300}
          height={300}
          alt={item.name}
          priority={false}
          className="object-contain max-sm:w-80 md:mx-auto rounded-md"
        />
        <Actions item={item} />
      </div>
      <div className="flex gap-1 flex-col  px-3">
        <h1 className="text-sm font-medium text-muted-foreground">
          {item.category}
        </h1>
        <h2 className="text-sm font-bold">{item.name}</h2>
        <h3 className="text-primary font-semibold text-sm">${item.price}</h3>
      </div>
    </div>
  );
}

function BtnAddToCart({ item }: { item: ItemProps }) {
  const { addItem } = useAppContext();

  return (
    <Button
      onClick={() => addItem(item)}
      className="h-10 w-48 bg-white text-black hover:text-white group cursor-pointer max-md:rounded-tr-3xl md:rounded-full font-semibold border"
    >
      <ShoppingCart className="group-hover:text-white w-5 h-5 text-primary" />
      Add to cart
    </Button>
  );
}

function BtnsRemoveIncrease({ item }: { item: ItemProps }) {
  const { increaseQuantity, decreaseQuantity, purchasedItems } =
    useAppContext();

  const cartItem = purchasedItems.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="flex items-center justify-between w-48 bg-primary max-md:rounded-l-md max-md:rounded-tr-3xl max-md:rounded-br-md md:rounded-full h-10 text-white z-30">
      <Button
        size={"icon"}
        onClick={() => decreaseQuantity(item)}
        className="bg-transparent hover:bg-transparent cursor-pointer"
      >
        <MinusCircle className="w-5 h-5" />
        <h1 className="sr-only">Decrease item</h1>
      </Button>
      <h1 className="text-white text-sm font-medium">{quantity}</h1>
      <Button
        size={"icon"}
        onClick={() => increaseQuantity(item)}
        className="bg-transparent hover:bg-transparent cursor-pointer"
      >
        <PlusCircle className="w-5 h-5" />
        <h1 className="sr-only">Add item</h1>
      </Button>
    </div>
  );
}

function Actions({ item }: { item: ItemProps }) {
  const { purchasedItems } = useAppContext();
  const [itemInCart, setItemInCart] = useState(false);

  useEffect(() => {
    const itemInCart = purchasedItems.find(
      (purchaseditem) => purchaseditem.id === item.id
    );
    setItemInCart(!!itemInCart);
  }, [purchasedItems, item]);

  return (
    <div className="flex gap-4 relative bottom-10 md:bottom-6 z-20 md:mx-auto">
      {itemInCart ? (
        <BtnsRemoveIncrease item={item} />
      ) : (
        <BtnAddToCart item={item} />
      )}
    </div>
  );
}
