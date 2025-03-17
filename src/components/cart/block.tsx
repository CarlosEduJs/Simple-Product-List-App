import { useAppContext } from "@/context/app-context";
import CartItem from "./item";
import Image from "next/image";
import ConfirmOrder from "../confirm-order/block";

export default function CartBlock() {
  const { purchasedItems } = useAppContext();
  const total = purchasedItems.reduce(
    (a, b) => a + (b.price || 0) * (b.quantity || 0),
    0
  );
  const totalItems = purchasedItems.reduce((a, b) => a + (b.quantity || 0), 0);

  return (
    <div className="flex flex-col gap-3 px-6 py-6 mt-10 lg:mt-0 lg:w-96 h-fit bg-white rounded-lg">
      <h1 className="text-primary font-bold">You Cart ({totalItems})</h1>
      {purchasedItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="flex flex-col">
            {purchasedItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-light">Order Total</h2>
            <h3 className="text-2xl font-bold">${total.toFixed(2)}</h3>
          </div>
          <div className="flex items-center justify-center gap-2 h-8 rounded-lg w-full bg-rose-50">
            <Image
              src={"/images/icon-carbon-neutral.svg"}
              width={15}
              height={15}
              alt="carbon"
            />
            <h4 className="flex text-xs">
                This is a <strong className="mx-1">carbon-neutral</strong> delivery
            </h4>
          </div>
          <ConfirmOrder/>
        </>
      )}
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col gap-4 w-full py-3 items-center justify-center">
      <Image
        src={"/images/illustration-empty-cart.svg"}
        width={200}
        height={200}
        alt="empty-cart"
      />
      <h1 className="text-sm text-amber-900 font-semibold">
        You added items will appear here
      </h1>
    </div>
  );
}
