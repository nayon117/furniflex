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
      <p className="font-bold text-green-700">Successful Payment</p>
      <p>Thank you for your purchase</p>
      <Link
        href="/"
        className="border p-4 font-bold hover:bg-black hover:text-white"
      >
        CONTINUE TO SHOPPING
      </Link>
    </div>
  );
};

export default PaymentSucess;
