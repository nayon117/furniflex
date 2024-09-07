import { useEffect, useState } from "react";
import { RiShoppingBasketLine } from "react-icons/ri";
import useCart from "../hooks/useCart";

const ProductList = () => {

  const [products, setProducts] = useState([]);
  const cart = useCart();

  // fetch data from db.json
  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);


  return (
    <div className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(({id,title,price,image,description}) => (
          <div key={id}>
            <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg ">
              <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                <img
                  src={image}
                  alt="product-image"
                  className="object-contain w-full h-full rounded-md"
                />
              </div>
              <div className="p-4">
                <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                    {title}
                </h6>
                <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                    {price}
                </h6>
                <p className="text-slate-600 leading-normal font-light">
                  {description}
                </p>
              </div>
              <div className="px-4 pb-4 pt-0 mt-2 w-full mx-auto text-center">
                <button
                 onClick={() => {
                    cart.addItem({
                      id,
                      title,
                      price,
                      quantity: 1,
                      description,
                      image,
                    });
                  }}
                  className="rounded-md  w-full mx-auto bg-slate-800 py-2 px-4 flex items-center justify-center gap-2 border  border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  active:bg-slate-700 hover:bg-slate-700 "
                  type="button"
                >
                 <RiShoppingBasketLine />
                 Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductList;
