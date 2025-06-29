export function Header() {
  return (
    <header className="w-full py-4 px-8 bg-neutral-950 shadow flex items-center justify-between">
      <span className="text-xl font-bold text-blue-300 tracking-wider">BlogForge AI</span>
    </header>
  );
}

export default function PageLayout({ children, sidebar = null }) {
  return (
    <div className="min-h-screen bg-transparent text-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 lg:gap-10 px-2 md:px-8 py-6">
        {sidebar && (
          <aside className="bg-neutral-900/90 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-8 lg:mb-0 lg:mt-6 flex flex-col justify-center border border-blue-900/30 animate-pulse-slow w-full lg:w-[320px]">
            {sidebar}
          </aside>
        )}
        {sidebar && (
          <div className="hidden lg:block w-px bg-neutral-800 mx-8" />
        )}
        <section className={`flex-1 flex flex-col justify-center w-full`}>
          {children}
        </section>
      </main>
    </div>
  );
}