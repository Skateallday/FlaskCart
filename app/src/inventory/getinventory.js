import { useState } from "react";

import Searchbar from "../search/searchbar.js";
import { useInventory } from "../context/inventoryContext.jsx";
import { useFilter } from "../context/filterContext.js";
import { useSearch } from "../context/searchContext.js";

import AddButton from "./addinvent.js";
import RemoveButton from "./removeinvent.js";

function GetInventory() {
  const { filter, setFilter } = useFilter();
  const { search, setSearch } = useSearch();
  const { pantry, addStock, removeStock } = useInventory();

  const [inputValue, setInputValue] = useState({});

  const cleanedSearch = search?.trim().toLowerCase();

  const pantryState = pantry.filter((item) => {
    const matchesSearch =
      !cleanedSearch ||
      cleanedSearch === "null" ||
      item.foodName.toLowerCase().includes(cleanedSearch);

    const matchesFilter =
      !filter ||
      filter === "null" ||
      item.foodType === filter;

    return matchesSearch && matchesFilter;
  });

  const getInputValue = (foodName) => {
    const value = inputValue[foodName];

    return value === undefined || value === null || value === ""
      ? 1
      : Number(value);
  };

  const handleQuantityChange = (foodName, value) => {
    setInputValue((prev) => ({
      ...prev,
      [foodName]: value,
    }));
  };

  const resetFilters = () => {
    setFilter(null);
    setSearch("");
  };

  const hasActiveFilters =
    (filter && filter !== "null") ||
    (cleanedSearch && cleanedSearch !== "null");

  return (
    <main className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-teal-700">
            Your kitchen
          </p>

          <h1 className="font-slab text-3xl font-bold text-slate-900 sm:text-4xl">
            Pantry inventory
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Keep track of what you already have and quickly find ingredients in your pantry.
          </p>
        </div>

        {/* Search and filter controls */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Searchbar />
            </div>

            <button
              type="button"
              className="rounded-lg border-2 border-teal-600 px-5 py-2.5 font-bold text-teal-800 transition hover:bg-teal-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
            >
              Clear filters
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-600">
              <span className="font-bold text-slate-900">{pantryState.length}</span>{" "}
              {pantryState.length === 1 ? "item" : "items"} found
            </p>

            {filter && filter !== "null" && (
              <div className="rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-900">
                {filter}
              </div>
            )}
          </div>
        </div>

        {/* Empty state */}
        {pantryState.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-4xl" aria-hidden="true">
              🥫
            </div>

            <h2 className="font-slab text-2xl font-bold text-slate-900">
              No pantry items found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-600">
              We couldn&apos;t find anything matching your current search and filters.
            </p>

            <button
              type="button"
              className="mt-6 rounded-lg bg-teal-500 px-5 py-2.5 font-bold text-black transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
              onClick={resetFilters}
            >
              Show all items
            </button>
          </div>
        ) : (
          <>
            {/* Desktop / tablet table */}
            <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-slate-100">
                    <tr>
                      <th scope="col" className="px-5 py-4 text-left text-sm font-bold text-slate-700">
                        Item
                      </th>

                      <th scope="col" className="px-5 py-4 text-left text-sm font-bold text-slate-700">
                        Type
                      </th>

                      <th scope="col" className="px-5 py-4 text-left text-sm font-bold text-slate-700">
                        Stock
                      </th>

                      <th scope="col" className="px-5 py-4 text-left text-sm font-bold text-slate-700">
                        Add stock
                      </th>

                      <th scope="col" className="px-5 py-4 text-left text-sm font-bold text-slate-700">
                        Remove stock
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {pantryState.map((item) => {
                      const inputQty = getInputValue(item.foodName);

                      return (
                        <tr key={item.foodName} className="transition hover:bg-teal-50/50">
                          <th scope="row" className="px-5 py-4 text-left font-bold text-slate-900">
                            {item.foodName}
                          </th>

                          <td className="px-5 py-4">
                            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                              {item.foodType}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span className="font-bold text-slate-900">{item.stock}</span>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                onChange={(event) => handleQuantityChange(item.foodName, event.target.value)}
                                value={inputQty}
                                name={`${item.foodName}addNumber`}
                                min="1"
                                max="500"
                                aria-label={`Quantity of ${item.foodName} to add`}
                                className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-center outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-500/30"
                              />

                              <AddButton
                                item={item}
                                value={inputQty}
                                onUpdate={addStock}
                              />
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                onChange={(event) => handleQuantityChange(item.foodName, event.target.value)}
                                value={inputQty}
                                name={`${item.foodName}removeNumber`}
                                min="1"
                                max="500"
                                aria-label={`Quantity of ${item.foodName} to remove`}
                                className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-center outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-500/30"
                              />

                              <RemoveButton
                                item={item}
                                value={inputQty}
                                onUpdate={removeStock}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-4 md:hidden">
              {pantryState.map((item) => {
                const inputQty = getInputValue(item.foodName);

                return (
                  <article key={item.foodName} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-slab text-xl font-bold text-slate-900">
                          {item.foodName}
                        </h2>

                        <span className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                          {item.foodType}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                          Stock
                        </p>

                        <p className="text-2xl font-bold text-slate-900">
                          {item.stock}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-200 pt-5">
                      <label htmlFor={`${item.foodName}-quantity`} className="mb-2 block text-sm font-bold text-slate-700">
                        Quantity
                      </label>

                      <input
                        id={`${item.foodName}-quantity`}
                        type="number"
                        onChange={(event) => handleQuantityChange(item.foodName, event.target.value)}
                        value={inputQty}
                        min="1"
                        max="500"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-500/30"
                      />

                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <AddButton
                          item={item}
                          value={inputQty}
                          onUpdate={addStock}
                        />

                        <RemoveButton
                          item={item}
                          value={inputQty}
                          onUpdate={removeStock}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default GetInventory;