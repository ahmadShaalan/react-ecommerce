import { useAuthStore } from '../../auth/store/authStore';

export function OverviewPage() {
  const session = useAuthStore((state) => state.session);

  return (
    <div className="grid min-h-screen place-items-center bg-zinc-50 font-sans text-zinc-900">
      <div className="rounded-xl border border-zinc-200 bg-white px-6 py-4 text-center shadow-sm">
        <h1 className="text-xl font-semibold">Overview (placeholder)</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Logged in as: {session?.user.email ?? 'nobody'}
        </p>
      </div>
    </div>
  );
}
