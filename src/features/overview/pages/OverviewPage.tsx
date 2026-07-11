import { useLogout } from '../../auth/api/authApi';
import { useAuthStore } from '../../auth/store/authStore';

export function OverviewPage() {
  const session = useAuthStore((state) => state.session);
  const { mutate: logout } = useLogout();

  return (
    <div className="grid min-h-screen place-items-center bg-zinc-50 font-sans text-zinc-900">
      <div className="rounded-xl border border-zinc-200 bg-white px-6 py-4 text-center shadow-sm">
        <h1 className="text-xl font-semibold">Overview (placeholder)</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Logged in as: {session?.user.email ?? 'nobody'}
        </p>
        <button
          onClick={() => logout()}
          className="mt-4 rounded-lg bg-zinc-900 cursor-pointer px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
