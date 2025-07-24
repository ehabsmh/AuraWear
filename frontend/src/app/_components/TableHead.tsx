type TableHeadProps = {
  titles: string[];
};

function TableHead({ titles }: TableHeadProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {titles.map((title, index) => (
          <th
            key={index}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
