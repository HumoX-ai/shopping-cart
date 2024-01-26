"use client";
import CustomImage from "@/components/image";
import { Product } from "../../..";
import { useEffect, useState } from "react";

const Cart = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("cart");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const decreaseQuantity = (id: number) => {
    const newData = data.map((item: Product) => {
      if (item.id === id && item.quantity > 1) {
        item.quantity--;
      }
      return item;
    });
    updateCart(newData);
  };

  const increaseQuantity = (id: number) => {
    const newData = data.map((item: Product) => {
      if (item.id === id) {
        item.quantity++;
      }
      return item;
    });
    updateCart(newData);
  };

  const deleteItem = (id: number) => {
    const newData = data.filter((item: Product) => item.id !== id);
    updateCart(newData);
  };

  const updateCart = (newData: Product[]) => {
    localStorage.setItem("cart", JSON.stringify(newData));
    setData(newData);
  };

  return (
    <div className="mt-2">
      <div className="h-screen pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {data.length > 0 ? (
              data.map((item: Product) => (
                <div
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  key={item.id}
                >
                  <div className="mb-4 sm:mb-0 sm:w-40">
                    <CustomImage product={item} />
                  </div>
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        {" "}
                        {item.description}{" "}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={item.quantity}
                          min="1"
                        />
                        <span
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">${item.price}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          onClick={() => deleteItem(item.id)}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Cart is empty</p>
            )}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">
                $
                {data
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  $
                  {(
                    data.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ) + 4.99
                  ).toFixed(2)}{" "}
                  USD
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
