const sizes = [
  { label: "XXS", count: 10 },
  { label: "XS", count: 12 },
  { label: "S", count: 13 },
  { label: "M", count: 13 },
  { label: "L", count: 12 },
  { label: "XL", count: 12 },
  { label: "XXL", count: 8 },
];

function FilterSizes() {
  return (
    <div className="mt-4 mb-4">
      <h3 className="font-semibold mb-3">Filter by Size</h3>
      <ul className="space-y-2 text-sm text-gray-800">
        {sizes.map((s) => (
          <li key={s.label} className="flex justify-between items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 checked:text-secondary accent-secondary border border-black"
              />
              {s.label}
            </label>
            <span className="text-gray-400">({s.count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterSizes;
