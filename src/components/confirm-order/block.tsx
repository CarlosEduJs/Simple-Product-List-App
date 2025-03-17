import { useAppContext } from "@/context/app-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import ItemOrderConfirmed from "./item";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "../ui/drawer";

export default function ConfirmOrder() {
  const { purchasedItems, clearCart } = useAppContext();
  const totalOrder = purchasedItems.reduce(
    (a, b) => a + (b.price || 0) * (b.quantity || 0),
    0
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleCloseModal = () => {
    setIsDialogOpen(false);
    clearCart();
  };
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DrawerTrigger asChild>
          <Button className="h-12 w-full rounded-full cursor-pointer text-white">
            Confirm Order
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-full md:min-w-96 p-8">
          <DrawerHeader>
            <CheckCircle className="w-12 h-12 text-secondary mb-3" />
            <DialogTitle className="font-bold text-3xl">
              Order Confirmed
            </DialogTitle>
            <DialogDescription>We hope you enjoy your food!</DialogDescription>
          </DrawerHeader>
          <div className="flex flex-col px-3 py-4 bg-rose-50 rounded-lg">
            <div className="max-h-64 overflow-y-auto">
              {purchasedItems.map((item) => (
                <ItemOrderConfirmed key={item.id} item={item} />
              ))}
            </div>
            <div className="flex items-center justify-between p-3">
              <h2 className="text-sm font-light">Order Total</h2>
              <h3 className="text-2xl font-bold">${totalOrder.toFixed(2)}</h3>
            </div>
          </div>
          <Button
            className="mt-6 w-full h-12 rounded-full cursor-pointer text-white"
            onClick={handleCloseModal}
          >
            Start New Order
          </Button>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 w-full rounded-full cursor-pointer text-white">
          Confirm Order
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full md:min-w-96 p-8">
        <DialogHeader>
          <CheckCircle className="w-12 h-12 text-secondary mb-3" />
          <DialogTitle className="font-bold text-3xl">
            Order Confirmed
          </DialogTitle>
          <DialogDescription>We hope you enjoy your food!</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col px-3 py-4 bg-rose-50 rounded-lg">
          <div className="max-h-64 overflow-y-auto">
            {purchasedItems.map((item) => (
              <ItemOrderConfirmed key={item.id} item={item} />
            ))}
          </div>
          <div className="flex items-center justify-between p-3">
            <h2 className="text-sm font-light">Order Total</h2>
            <h3 className="text-2xl font-bold">${totalOrder.toFixed(2)}</h3>
          </div>
        </div>
        <Button
          className="mt-6 w-full h-12 rounded-full cursor-pointer text-white"
          onClick={handleCloseModal}
        >
          Start New Order
        </Button>
      </DialogContent>
    </Dialog>
  );
}
