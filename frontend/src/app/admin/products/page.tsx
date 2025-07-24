import TableBody from "@/app/_components/TableBody";
import TableHead from "@/app/_components/TableHead";
import Image from "next/image";
import { BiEdit, BiTrash } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const products = [
  {
    id: 1,
    image: "https://placehold.co/40x40/E0E0E0/333333?text=T", // Placeholder for Black T-shirt
    name: "Black T-shirt",
    size: "S, M, L, XL",
    price: "$80.00",
    stock: "486 Item Left\n155 Sold",
    category: "Fashion",
    rating: 4.5,
    reviews: 55,
  },
  {
    id: 2,
    image: "https://placehold.co/40x40/E0E0E0/333333?text=B", // Placeholder for Olive Green Leather Bag
    name: "Olive Green Leather Bag",
    size: "Size:S, M, L",
    price: "$136.00",
    stock: "784 Item Left\n674 Sold",
    category: "Hand Bag",
    rating: 4.1,
    reviews: 143,
  },
  {
    id: 3,
    image: "https://placehold.co/40x40/E0E0E0/333333?text=D", // Placeholder for Women Golden Dress
    name: "Women Golden Dress",
    size: "Size: S, M, L",
    price: "$219.00",
    stock: "769 Item Left\n180 Sold",
    category: "Fashion",
    rating: 4.4,
    reviews: 174,
  },
  {
    id: 4,
    image: "https://placehold.co/40x40/E0E0E0/333333?text=C", // Placeholder for Gray Cap For Men
    name: "Gray Cap For Men",
    size: "Size: S, M, L",
    price: "$76.00",
    stock: "571 Item Left\n87 Sold",
    category: "Cap",
    rating: 4.2,
    reviews: 23,
  },
  {
    id: 5,
    image: "https://placehold.co/40x40/E0E0E0/333333?text=P", // Placeholder for Dark Green Cargo Pent
    name: "Dark Green Cargo Pent",
    size: "Size: S, M, L, XL",
    price: "$110.00",
    stock: "241 Item Left\n342 Sold",
    category: "Fashion",
    rating: 4.4,
    reviews: 103,
  },
  {
    id: 6,
    image: "https://placehold.co/40x40/E0E0E0/333333?text=H", // Placeholder for Orange Muth Color Headphone
    name: "Orange Muth Color Headphone",
    size: "Size: S, M, L",
    price: "$231.00",
    stock: "821 Item Left\n231 Sold",
    category: "Electronics",
    rating: 4.2,
    reviews: 200,
  },
  {
    id: 7,
    image: "https://placehold.co/40x40/E0E0E0/333333?text=S", // Placeholder for Kid's Yellow Shoes
    name: "Kid's Yellow Shoes",
    size: "Size: 18, 19, 20, 21",
    price: "$83.00",
    stock: "321 Item Left\n681 Sold",
    category: "Shoes",
    rating: 4.5,
    reviews: 321,
  },
  {
    id: 8,
    image: "https://placehold.co/40x40/E0E0E0/333333?text=W", // Placeholder for Men Dark Brown Wallet
    name: "Men Dark Brown Wallet",
    size: "Size: S, M, L",
    price: "$132.00",
    stock: "190 Item Left\n212 Sold",
    category: "Wallet",
    rating: 4.1,
    reviews: 190,
  },
  {
    id: 9,
    image: "https://placehold.co/40x40/E0E0E0/333333?text=G", // Placeholder for Sky Blue Sunglass
    name: "Sky Blue Sunglass",
    size: "Size: S, M, L",
    price: "$77.00",
    stock: "784 Item Left\n443 Sold",
    category: "Sunglass",
    rating: 3.5,
    reviews: 298,
  },
];

const titles = [
  "Product Name & Size",
  "Price",
  "Stock",
  "Category",
  "Rating",
  "Action",
];

function page() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full overflow-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
          All Product List
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
            Add Product
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
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-full object-cover"
                          quality={100}
                          height="150"
                          width="150"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Size: {product.size}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.stock.split("\n")[0]}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.stock.split("\n")[1]}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="font-medium mr-1">{product.rating}</span>
                      <span className="ml-1 text-gray-500">
                        {product.reviews} Review
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {/* View Icon */}
                      <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-150">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </button>
                      {/* Edit Icon */}
                      <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-150">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                      {/* Delete Icon */}
                      <button className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors duration-150">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.927a2.25 2.25 0 0 1-2.244-2.077L4.78 6.75m1.018 0H19.5m-9-3.75h.008v.008H10.5V2.25Zm-3 0h.008v.008H7.5V2.25Zm3 0h.008v.008H13.5V2.25Z"
                          />
                        </svg>
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
