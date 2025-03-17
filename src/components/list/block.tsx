import List from "./list";

export default function ListBlock() {
  return (
    <div className="flex flex-col gap-4 min-w-lg">
      <h1 className="text-3xl font-bold max-sm:ml-3">Desserts</h1>
      <List />
    </div>
  );
}
