export default function Home() {
  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-widest text-oranje">
          Bryan de Zwart Bookings
        </p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-6xl">
          De juiste act voor jouw feest.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-dim">
          Dj&apos;s, artiesten en bands voor bruiloften, bedrijfsfeesten en
          dorpsfeesten. Ik regel het van eerste telefoontje tot laatste nummer.
        </p>

        
        <a
          href="#"
          className="mt-10 inline-block rounded-full bg-oranje px-7 py-3 font-medium text-zwart transition hover:opacity-90"
        >
          Vraag vrijblijvend aan
        </a>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {["Dj's", "Artiesten", "Bands"].map((t) => (
            <div
              key={t}
              className="rounded-2xl border border-rand bg-kaart p-6"
            >
              <h2 className="text-xl font-medium">{t}</h2>
              <p className="mt-2 text-sm text-dim">Bekijk het aanbod</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
