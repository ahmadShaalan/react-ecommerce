import { Plus } from 'lucide-react';
import CategoriesList from '../components/CategoriesList';
import AddCategoryForm from '../components/AddCategoryForm';
import EditCategoryForm from '../components/EditCategoryForm';
import { useState } from 'react';

export function CategoriesPage() {
  const [showEditCategoryForm, setShowEditCategoryForm] =
    useState<boolean>(false);

  const showEditCategoryFormHandler = () => {
    setShowEditCategoryForm(true);
  };

  return (
    <main className="grid grid-cols-1 gap-6 px-8 py-8 lg:grid-cols-3">
      {/* Left — the list */}
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm lg:col-span-2">
        <CategoriesList
          showEditCategoryFormHandler={showEditCategoryFormHandler}
        />
      </div>

      {/* Right — the form */}
      <div className="h-fit rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">
            {showEditCategoryForm ? 'Edit' : 'New'} Category
          </h3>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
          >
            {showEditCategoryForm ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowEditCategoryForm(false)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-black px-2 py-1 text-xs font-medium text-white transition hover:bg-zinc-800"
                >
                  <Plus size={14} />
                  New
                </button>
              </>
            ) : (
              <>
                <span></span>
              </>
            )}
          </button>
        </div>

        {showEditCategoryForm ? <EditCategoryForm /> : <AddCategoryForm />}
      </div>
    </main>
  );
}
