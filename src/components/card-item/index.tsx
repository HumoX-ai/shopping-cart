"use client";
import Link from "next/link";
import { Product } from "../../..";
import CustomImage from "../image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../header";

const CardItem = ({ data }: { data: Product[] }) => {
  const [sortedData, setSortedData] = useState<Product[]>(data);
  const [activeButton, setActiveButton] = useState<string>("All");
  const [cartData, setCartData] = useState<Product[]>([]);
  const router = useRouter();

  const handleSortedCategry = (category: string) => {
    const filteredData = data.filter((item) => item.category === category);
    setSortedData(filteredData);
    setActiveButton(category);
  };

  const categorySet = new Set(data.map((item) => item.category));
  const categories = Array.from(categorySet);

  const resetSorttedCategry = () => {
    setSortedData(data);
    setActiveButton("All");
  };

  useEffect(() => {
    const cartItem = localStorage.getItem("cart");
    if (cartItem !== null) {
      const cart = JSON.parse(cartItem);
      setCartData(cart);
    }
  }, []);

  return (
    <div>
      <Header
        activeButton={activeButton}
        handleSortedCategry={handleSortedCategry}
        resetSorttedCategry={resetSorttedCategry}
        cartData={cartData}
        router={router}
        categories={categories}
      />
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
        {sortedData?.map((item: Product, index) => (
          <Link key={index} href={`/product/${item.id}`}>
            <div className="max-w-xxl rounded overflow-hidden shadow-lg">
              <div className="relative h-64">
                <CustomImage product={item} fill />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {item.title.length > 18
                    ? item.title.slice(0, 18) + "..."
                    : item.title}
                </div>
                <p className="text-gray-700 text-base">
                  {item.description.slice(0, 110) + "..."}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2 flex justify-between">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{item.category}
                </span>
                <span>${item.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardItem;
