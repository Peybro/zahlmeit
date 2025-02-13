import Edit from "../icons/Edit.icon";

export default function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={() => onClick()}>
      <Edit />
    </button>
  );
}
