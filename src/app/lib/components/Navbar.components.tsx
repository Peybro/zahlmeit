import Link from "next/link";

export default function Navigation() {
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
        <li>
          <Link href="/rezepte">Rezepte</Link>
        </li>
        <li>
          <Link href="/zutaten" className="nav-link">
            Zutaten
          </Link>
        </li>
        <li>
          <Link href="/einheiten" className="nav-link">
            Einheiten
          </Link>
        </li>
      </ul>
    </nav>
  );
}
