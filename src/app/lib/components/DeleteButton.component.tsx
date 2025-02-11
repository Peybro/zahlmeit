import Trash from "../icons/Trash.icon";

export default function DeleteButton({ onDelete }: { onDelete: () => void }) {
  return (
    <button onClick={onDelete} className="bg-red-500 border-none">
      <Trash />
    </button>
  );
}
