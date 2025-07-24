import TableBody from "@/app/_components/TableBody";
import TableHead from "@/app/_components/TableHead";
import Image from "next/image";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";

const titles = ["Category Name", "Gender", "Actions"];

// create list of categories based on the titles
const categories = [
  {
    id: 1,
    image: "https://placehold.co/40x40/E0E0E0/333333?text=T", // Placeholder for Black T-shirt
    name: "T-shirts",
    gender: "Male",
  },
  {
    id: 2,
    image: "https://placehold.co/40x40/E0E0E0/333333?text=B", // Placeholder for Olive Green Leather Bag
    name: "Shirts",
    gender: "Male",
  },
  {
    id: 3,
    image: "https://placehold.co/40x40/E0E0E0/333333?text=C", // Placeholder for Olive Green Leather Bag
    name: "Sweaters",
    gender: "Male",
  },
];

function page() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full overflow-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
          All Categories List
        </h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Category
          </button>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHead titles={titles} />
          <TableBody
            render={() =>
              categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Image
                          src={category.image}
                          alt={category.name}
                          className="h-10 w-10 rounded-full object-cover"
                          quality={100}
                          height="150"
                          width="150"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {category.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {category.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {/* View Icon */}
                      <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-150">
                        <BsEye />
                      </button>
                      {/* Edit Icon */}
                      <button className="text-yellow-500 hover:text-yellow-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-150">
                        <BiEdit />
                      </button>
                      {/* Delete Icon */}
                      <button className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors duration-150">
                        <BiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
          />
        </table>
      </div>
    </div>
  );
}

export default page;
