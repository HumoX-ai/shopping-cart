import CardItem from "@/components/card-item";
import axios from "axios";

export default async function Home() {
  const res = await axios.get("https://fakestoreapi.com/products");
  const data = res.data;
  return (
    <div>
      <div className="container mx-auto mt-2 flex justify-center">
        <CardItem data={data} />
      </div>
    </div>
  );
}
