export default function Footer() {
  return (
    <footer className="mt-32 border-t border-rand/60">
      <div className="mx-auto max-w-6xl px-6 py-12 text-sm text-dim">
        <p className="font-medium text-tekst">Bryan de Zwart Bookings</p>
        <p className="mt-2">Cuijk, Noord-Brabant</p>
        <p className="mt-6">&copy; {new Date().getFullYear()} Bryan de Zwart Bookings</p>
      </div>
    </footer>
  );
}
