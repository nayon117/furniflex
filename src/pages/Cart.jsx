import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import DetailModal from "../components/DetailModal";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemInfo, setItemInfo] = useState([]);
  const cart = useCart();
  const { user } = useAuth();

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  // Update itemInfo whenever cart items change
  useEffect(() => {
    if (user && cart.cartItems.length > 0) {
      const itemsInfo = cart.cartItems.map((item) => ({
        userName: user.displayName || "",
        userEmail: user.email || "",
        userImage: user.photoURL || "",
        title: item.title || "",
        price: item.price || "",
        image: item.image || "",
        description: item.description || "",
        productId: item.id || "",
        quantity: item.quantity || 1,  
      }));
  
      setItemInfo(itemsInfo);
    }
  }, [user, cart.cartItems]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex gap-20 px-10 py-16 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full py-16">
        <p className="font-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="font-bold">No item in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.id}
                className="flex w-full items-center justify-between px-4 py-3 hover:bg-gray-100 max-sm:flex-col max-sm:items-start max-sm:gap-3"
              >
                <div className="flex items-center">
                  <img
                    src={cartItem.image}
                    width={100}
                    height={100}
                    className="size-32 rounded-lg object-cover"
                    alt="product"
                  />
                  <div className="ml-4 flex flex-col gap-3">
                    <p className="font-bold">{cartItem.title}</p>
                    <p className="font-medium">${cartItem.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaMinusCircle
                    className="cursor-pointer text-xl hover:text-red-200"
                    onClick={() => cart.decreaseQuantity(cartItem.id)}
                  />
                  <p className="font-bold">{cartItem.quantity}</p>
                  <FaPlusCircle
                    className="cursor-pointer text-xl hover:text-green-200"
                    onClick={() => cart.increaseQuantity(cartItem.id)}
                  />
                </div>

                <FaTrash
                  className="cursor-pointer hover:text-red-200"
                  onClick={() => cart.removeItem(cartItem.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex w-1/3 flex-col gap-8 rounded-lg bg-gray-100 px-4 py-5 max-lg:w-full my-16">
        <p className="pb-4 font-bold">
          Summary{" "}
          <span>({cart.cartItems.length} {
            cart.cartItems.length > 1 ? "items" : "item"
          })</span>
        </p>
        <div className="flex justify-between font-semibold">
          <span>Total Amount</span>
          <span>$ {totalRounded}</span>
        </div>
        <button 
          className="w-full bg-black text-white px-3 py-2 rounded-lg border"
          onClick={() => setIsOpen(true)}
        >
          Proceed to Checkout
        </button>
        <DetailModal
          isOpen={isOpen}
          itemInfo={itemInfo}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default Cart;
