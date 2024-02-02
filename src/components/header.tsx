import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import { Product } from "../..";

interface Props {
  activeButton: string;
  handleSortedCategry: (category: string) => void;
  resetSorttedCategry: () => void;
  cartData: Product[];
  router: any;
  categories: string[];
}

const Header = ({
  activeButton,
  handleSortedCategry,
  resetSorttedCategry,
  cartData,
  router,
  categories,
}: Props) => {
  return (
    <div>
      <div className="mb-4 flex justify-between">
        <div>
          <button
            onClick={() => resetSorttedCategry()}
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ${
              activeButton === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSortedCategry(item)}
              className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ${
                activeButton === item ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              #{item}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-2">
          <div onClick={() => router.push("/cart")}>
            <Badge> {cartData.length} </Badge>
            <ShoppingCart size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
