import { useMatches } from 'react-router-dom';
import { Bell } from 'lucide-react';

interface PageHandle {
  title: string;
  subtitle?: string;
}

export function Topbar() {
  const matches = useMatches();
  const handle = matches[matches.length - 1]?.handle as PageHandle | undefined;

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-8 backdrop-blur">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          {handle?.title ?? ''}
        </h1>
        {handle?.subtitle && (
          <p className="text-xs text-zinc-500">{handle.subtitle}</p>
        )}
      </div>

      <button className="relative rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900">
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
      </button>
    </header>
  );
}
