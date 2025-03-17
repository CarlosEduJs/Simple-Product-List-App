import { useAppContext } from "@/context/app-context";
import Item from "./item";
import { useRef, KeyboardEvent } from "react";

export default function List() {
  const { itemsDisponiveis } = useAppContext();
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!listRef.current) return;
    
    const items = Array.from(listRef.current.querySelectorAll('[role="listitem"]'));
    const currentIndex = items.findIndex(item => item === document.activeElement || item.contains(document.activeElement));
    
    switch (e.key) {
      case 'ArrowRight':
        if (currentIndex < items.length - 1) {
          (items[currentIndex + 1] as HTMLElement).focus();
        }
        break;
      case 'ArrowLeft':
        if (currentIndex > 0) {
          (items[currentIndex - 1] as HTMLElement).focus();
        }
        break;
      case 'ArrowDown':
        const nextRowIndex = currentIndex + 3; // Based on grid-cols-3
        if (nextRowIndex < items.length) {
          (items[nextRowIndex] as HTMLElement).focus();
        }
        break;
      case 'ArrowUp':
        const prevRowIndex = currentIndex - 3; // Based on grid-cols-3
        if (prevRowIndex >= 0) {
          (items[prevRowIndex] as HTMLElement).focus();
        }
        break;
      case 'Home':
        if (items.length > 0) {
          (items[0] as HTMLElement).focus();
        }
        break;
      case 'End':
        if (items.length > 0) {
          (items[items.length - 1] as HTMLElement).focus();
        }
        break;
    }
  };

  return (
    <div 
      ref={listRef}
      role="list"
      aria-label="Items list"
      className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4"
      onKeyDown={handleKeyDown}
    >
      {itemsDisponiveis.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}