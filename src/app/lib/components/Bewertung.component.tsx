"use client";

import { useEffect, useState } from "react";
import Star from "../icons/Star.icon";

export default function Bewertung({
  type,
  name,
  max,
  defaultValue,
  onChange: onChange,
  editable = true,
}: {
  type: "range" | "stars";
  name?: string;
  max: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  editable?: boolean;
}) {
  const [selectedStar, setSelectedStar] = useState<number>(defaultValue ?? 0);
  const [selectedTemp, setSelectedTemp] = useState<boolean>(false);
  const [tempStars, setTempStars] = useState<number>(0);

  useEffect(() => {
    onChange !== undefined && onChange(selectedStar);
  }, [selectedStar]);

  if (type === "range")
    return (
      <div className="mx-3">
        <div className="flex justify-between w-full">
          {Array(max)
            .fill(0)
            .map((elem, i) => {
              return (
                <span key={i} className="">
                  {i + 1}
                </span>
              );
            })}
        </div>
        <input
          type="range"
          min={1}
          max={max}
          name={name}
          defaultValue={defaultValue}
          onChange={(e) =>
            onChange !== undefined && onChange(parseInt(e.currentTarget.value))
          }
          disabled={!editable}
        />
      </div>
    );

  if (type === "stars") {
    return (
      <div className="flex">
        {Array(max)
          .fill(0)
          .map((elem, i) => {
            return (
              <div
                key={i}
                onMouseEnter={() => {
                  if (!editable) return;
                  setTempStars(i + 1);
                  setSelectedTemp(true);
                }}
                onMouseLeave={() => editable && setSelectedTemp(false)}
                onClick={() => editable && setSelectedStar(i + 1)}
              >
                <Star
                  filled={selectedTemp ? i < tempStars : i < selectedStar}
                />
                <input type="hidden" name={name} value={selectedStar} />
              </div>
            );
          })}
      </div>
    );
  }
}
