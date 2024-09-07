import { useEffect } from "react";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

const PaymentSucess = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, [cart]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <p className="font-bold text-xl text-green-700">Successful Payment</p>
      <p>Thank you for your purchase</p>
      <Link
        href="/"
        className="border px-3 py-2 rounded-md font-bold bg-black hover:bg-gray-600 text-white"
      >
        CONTINUE TO SHOPPING
      </Link>
    </div>
  );
};

export default PaymentSucess;
