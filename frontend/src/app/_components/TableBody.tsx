function TableBody({ render }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">{render()}</tbody>
  );
}

export default TableBody;
