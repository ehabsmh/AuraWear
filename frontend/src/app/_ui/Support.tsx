import { BiCreditCard } from "react-icons/bi";
import { TbCreditCardRefund, TbHours24, TbTruckDelivery } from "react-icons/tb";

function Support() {
  return (
    <section className="">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
        <div className="relative pl-20 flex items-start">
          <TbTruckDelivery
            size={70}
            className="text-secondary-light absolute -top-7 left-0"
          />
          <div>
            <p className="text-gray-800 font-semibold text-2xl mb-3 leading-none">
              Free Shipping
            </p>
            <p className="text-lg text-gray-500">
              Ut enim ad minim veniam liquip ami tomader
            </p>
          </div>
        </div>
        <div className="relative pl-20 flex items-start">
          <BiCreditCard
            size={70}
            className=" text-secondary-light absolute -top-7 left-0"
          />
          <div>
            <p className="text-gray-800 font-semibold text-2xl mb-3 leading-none">
              Secure Payments
            </p>
            <p className="text-lg text-gray-500">
              Eonim ad minim veniam liquip tomader
            </p>
          </div>
        </div>
        <div className="relative pl-20 flex items-start">
          <TbCreditCardRefund
            size={70}
            className=" text-secondary-light absolute -top-7 left-0"
          />
          <div>
            <p className="text-gray-800 font-semibold text-2xl mb-3 leading-none">
              Easy Returns
            </p>
            <p className="text-lg text-gray-500">
              Be enim ad minim veniam liquipa ami tomader
            </p>
          </div>
        </div>
        <div className="relative pl-20 flex items-start">
          <TbHours24
            size={70}
            className=" text-secondary-light absolute -top-7 left-0"
          />
          <div>
            <p className="text-gray-800 font-semibold text-2xl mb-3 leading-none">
              24/7 Support
            </p>
            <p className="text-lg text-gray-500">
              Ut enim ad minim veniam liquip ami tomader
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Support;
