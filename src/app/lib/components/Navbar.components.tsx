"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <h3>
            <Link href="/">Zahlmeit 🥢</Link>
          </h3>
        </li>
      </ul>
      <ul>
        {["Rezepte", "Zutaten", "Einheiten", "Tags"].map((route) => {
          return (
            <li key={route}>
              <Link
                href={`/${route.toLocaleLowerCase()}`}
                className={
                  pathname.startsWith(`/${route.toLocaleLowerCase()}`)
                    ? "text-primary"
                    : ""
                }
              >
                {route}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
