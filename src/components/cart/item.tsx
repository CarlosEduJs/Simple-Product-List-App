import { ItemProps } from "@/interfaces/item";
import { Button } from "../ui/button";
import { useAppContext } from "@/context/app-context";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";

export default function CartItem({ item }: { item: ItemProps }) {
  const { increaseQuantity, decreaseQuantity, purchasedItems, removeItem } =
    useAppContext();
  const cartItem = purchasedItems.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;
  const total = item.price * quantity;

  return (
    <div className="flex items-center w-full justify-between border-b py-2">
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold ml-2">{item.name}</h3>
        <div className="flex items-center gap-2 max-w-fit">
          <div className="flex items-center">
            <Button
              size={"icon"}
              onClick={() => decreaseQuantity(item)}
              className="bg-transparent hover:bg-transparent cursor-pointer w-fit mx-1"
            >
              <MinusCircle className="w-3 h-3" />
              <h1 className="sr-only">Decrease item</h1>
            </Button>
            <h1 className="text-xs font-semibold text-primary">{quantity}x</h1>
            <Button
              size={"icon"}
              onClick={() => increaseQuantity(item)}
              className="bg-transparent hover:bg-transparent cursor-pointer w-fit mx-1"
            >
              <PlusCircle className="w-3 h-3" />
              <h1 className="sr-only">Add item</h1>
            </Button>
          </div>
          <h2 className="text-xs font-light text-amber-900">
            @ ${item.price.toFixed(2)}
          </h2>
          <h3 className="text-xs font-semibold text-amber-800">
            ${total.toFixed(2)}
          </h3>
        </div>
      </div>
      <Button
        size={"icon"}
        className="bg-transparent hover:bg-transparent hover:text-amber-900 cursor-pointer"
        onClick={() => removeItem(item)}
      >
        <Trash className="w-5 h-5 " />
        <h1 className="sr-only">Remove Item</h1>
      </Button>
    </div>
  );
}
