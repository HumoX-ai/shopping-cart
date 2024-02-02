"use client";
import CustomImage from "@/components/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product as ProductType } from "../../../..";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const Product = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState<ProductType[]>([]);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://fakestoreapi.com/products/${params.id}`).then((res) => {
      setData(res.data);
      // Mahsulotlarni localStorage dan olish
      const storedProducts = JSON.parse(localStorage.getItem("cart") || "[]");
      // Tanlangan mahsulotni qidirish
      const selectedProduct = storedProducts.find(
        (product: { id: number }) => product.id === res.data.id
      );
      setQuantity(selectedProduct?.quantity || 0);
    });
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    const cartItem = localStorage.getItem("cart");
    if (cartItem !== null) {
      const cart = JSON.parse(cartItem);
      setCartData(cart);
    }
  }, []);

  if (!data) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="h-10 w-10 rounded-full border-4 border-dotted border-blue-600 animate-spin" />
      </div>
    );
  }

  const addToCart = () => {
    // Mahsulotlarni localStorage dan olish
    const storedProducts = JSON.parse(localStorage.getItem("cart") || "[]");

    // Tanlangan mahsulotni qidirish
    const selectedProductIndex = storedProducts.findIndex(
      (product: { id: number }) => product.id === data.id
    );

    // Tanlangan mahsulotni o'zgartirish
    if (selectedProductIndex !== -1) {
      storedProducts[selectedProductIndex].quantity++;
      setQuantity(storedProducts[selectedProductIndex].quantity);
    } else {
      // Agar mahsulot topilmasa, yangi mahsulot qo'shish
      storedProducts.push({ ...data, quantity: 1 });
      setQuantity(1);
    }

    // Mahsulotlarni localStorage ga saqlash
    localStorage.setItem("cart", JSON.stringify(storedProducts));
  };

  return (
    <div>
      <div className="flex container mx-auto mt-2 justify-between max-w-xxl">
        <div></div>
        <div onClick={() => router.push("/cart")}>
          <Badge> {cartData.length} </Badge>
          <ShoppingCart size={28} />
        </div>
      </div>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10">
        <CustomImage product={data} />

        <div className="divide-2">
          <div className="space-y-2 pb-8">
            <h1 className="text-2xl md:text-4xl font-bold">{data.title}</h1>
            <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
              ${data.price}
            </h2>
          </div>

          <div>
            <p className="text-xs md:text-sm">{data.description}</p>
          </div>
          <Button
            className="w-full mt-2"
            onClick={() => {
              addToCart();
            }}
          >
            Buy Now ({quantity})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
