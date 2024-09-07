import { Dialog, Transition } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { Fragment } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../form/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const DetailModal = ({ closeModal, isOpen, itemInfo }) => {
  console.log("item from detail modal", itemInfo);

  // Ensure itemInfo is an array and contains valid data
  const totalAmount = itemInfo.reduce((sum, item) => {
    const itemPrice = parseFloat(item.price) || 0; // Ensure price is a number
    const itemQuantity = item.quantity || 1; // Default to 1 if quantity is missing
    return sum + itemPrice * itemQuantity;
  }, 0);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Payment
                </Dialog.Title>
                
                {/* Display total amount */}
                <div className="mt-2 rounded-lg border-2 border-third">
                  <p className="text-sm p-2 text-gray-500">
                    Total Amount: $ {totalAmount.toFixed(2)}
                  </p>
                </div>

                <hr className="mt-8 " />
                {/* Card data form */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm closeModal={closeModal} itemInfo={itemInfo} />
                </Elements>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DetailModal;
