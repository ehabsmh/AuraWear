const colors = [
  { name: "Apple Red", color: "#981b32", count: 9 },
  { name: "Bio Blue", color: "#0047AB", count: 13 },
  { name: "Sweet Orange", color: "#e59650", count: 8 },
  { name: "Blue", color: "#89a9e5", count: 10 },
  { name: "Green", color: "#076f52", count: 12 },
  { name: "Pink", color: "#f7b1b1", count: 7 },
  { name: "Red", color: "#e53935", count: 6 },
  { name: "Black", color: "#000000", count: 11 },
  { name: "White", color: "#e0e0e0", count: 8 },
  { name: "Yellow", color: "#fff59d", count: 4 },
];

function FilterColors() {
  return (
    <div className="mb-4 mt-4">
      <h3 className="font-semibold mb-3">Filter by Color</h3>
      <ul className="space-y-2">
        {colors.map((c) => (
          <li
            key={c.name}
            className="flex items-center justify-between text-sm text-gray-800"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: c.color }}
              />
              <span>{c.name}</span>
            </div>
            <span className="text-gray-400">({c.count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterColors;
