import { Product } from "@/types/types";
import ProductItem from "./ProductItem";

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <ul className="space-y-6 overflow-y-auto h-[60%]">
      {products.map((product) => {
        return <ProductItem key={product.productId} product={product} />;
      })}
    </ul>
  );
};

export default ProductList;
