"use client";

import AppContextProvider from "@/context/app-context";
import ListBlock from "./list/block";
import CartBlock from "./cart/block";

export default function Block() {
  return (
    <AppContextProvider>
      <div className="min-w-screen min-h-screen  sm:px-5 md:px-12 lg:px-20  py-12 flex flex-col lg:flex-row lg:gap-4 ">
        <ListBlock />
        <CartBlock/>
      </div>
    </AppContextProvider>
  );
}
