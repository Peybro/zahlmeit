import { useState } from "react";
import Trash from "../icons/Trash.icon";

export default function Tag({
  tag,
  onDeleteTag,
}: {
  tag: string;
  onDeleteTag: () => void;
}) {
  const [tagDeletable, setTagDeletable] = useState(false);

  return (
    <div
      key={tag}
      className="flex justify-between bg-emerald-700 text-white rounded-full px-3 py-1"
      onMouseEnter={() => setTagDeletable(true)}
      onMouseLeave={() => setTagDeletable(false)}
    >
      {tag}
      {tagDeletable && (
        <div className="cursor-pointer" onClick={onDeleteTag}>
          <Trash />
        </div>
      )}
    </div>
  );
}
