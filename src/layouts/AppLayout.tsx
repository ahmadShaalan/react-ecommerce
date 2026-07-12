import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Sidebar — real one next step */}
      <Sidebar />

      {/* Main column */}
      <div className="ml-64">
        {/* Topbar — real one step after */}
        <Topbar />

        {/* The matched child page renders here */}
        <Outlet />
      </div>
    </div>
  );
}
