const statuses = ["In Stock", "On Sale"];

function FilterStatus() {
  return (
    <div className="mt-4 mb-4">
      <h3 className="font-semibold mb-3">Product Status</h3>
      <ul className="space-y-2 text-sm text-gray-800">
        {statuses.map((status) => (
          <li key={status}>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 accent-secondary" />
              {status}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterStatus;
