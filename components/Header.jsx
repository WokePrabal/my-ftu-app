import Link from "next/link";

export default function Header() {
  return (
    <header className="ftu-header">
      <div className="ftu-header__inner">
        {/* Brand text wrapped in Link to go Home */}
        <Link href="/" className="ftu-header__brand">
          FTU Application Form
        </Link>

        <nav className="ftu-header__nav" aria-label="Primary">
          <Link href="/applicationList" className="ftu-header__link">
            My Applications
          </Link>
        </nav>
      </div>
    </header>
  );
}