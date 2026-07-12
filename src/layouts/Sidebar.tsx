import { NavLink } from 'react-router-dom';
import {
  Zap,
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Star,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../features/auth/store/authStore';
import { useLogout } from '../features/auth/api/authApi';

const NAV = [
  {
    label: 'Main',
    items: [{ to: '/dashboard', icon: LayoutDashboard, text: 'Overview' }],
  },
  {
    label: 'Catalog',
    items: [
      { to: '/products', icon: Package, text: 'Products' },
      { to: '/categories', icon: FolderTree, text: 'Categories' },
    ],
  },
  {
    label: 'Sales',
    items: [
      { to: '/orders', icon: ShoppingBag, text: 'Orders' },
      { to: '/customers', icon: Users, text: 'Customers' },
    ],
  },
  {
    label: 'Content',
    items: [{ to: '/reviews', icon: Star, text: 'Reviews' }],
  },
  {
    label: 'Configure',
    items: [{ to: '/settings', icon: Settings, text: 'Settings' }],
  },
];

export function Sidebar() {
  const profile = useAuthStore((state) => state.userInfo);
  const session = useAuthStore((state) => state.session);
  const logout = useLogout();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-zinc-900 text-zinc-100">
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-zinc-800/60 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <div className="text-base font-semibold">Lumen</div>
          <div className="-mt-0.5 text-[10px] uppercase tracking-wider text-zinc-400">
            Admin
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4 text-sm">
        {NAV.map((section) => (
          <div key={section.label}>
            <div className="px-2 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 first:pt-1">
              {section.label}
            </div>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center gap-3 rounded-lg bg-zinc-800 px-3 py-2 font-medium text-white'
                    : 'flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                }
              >
                <item.icon className="h-4 w-4" />
                {item.text}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-zinc-800/60 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-sm font-semibold text-white">
            {profile?.full_name?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-white">
              {profile?.full_name ?? '—'}
            </div>
            <div className="truncate text-xs text-zinc-400">
              {session?.user.email}
            </div>
          </div>
          <button
            type="button"
            onClick={() => logout.mutate()}
            title="Log out"
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
