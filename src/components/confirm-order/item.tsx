import { ItemProps } from "@/interfaces/item";
import Image from "next/image";

export default function ItemOrderConfirmed({ item }: { item: ItemProps }) {
  const quantity = item?.quantity || 0;
  const total = item?.price * quantity;

  return (
    <div className="flex items-center justify-between w-full py-3 border-b px-3">
      <div className="flex items-center gap-3">
        <Image src={item.image} width={50} height={50} alt={item.name} className="rounded-md" />
        <div className="flex flex-col gap-1">
          <h1 className="text-sm font-semibold">{item.name}</h1>
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-semibold text-primary">{quantity}x</h2>
            <h3 className="text-xs font-light text-amber-900">
              @ ${item.price.toFixed(2)}
            </h3>
          </div>
        </div>
      </div>
      <h3 className="text-sm font-semibold text-amber-950">${total.toFixed(2)}</h3>
    </div>
  );
}
