import { Order } from "@/types/types";
import OrderItem from "./OrderItem";

const Orders: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <ul className="space-y-6 h-[60%] overflow-y-auto overflow-x-hidden">
      {orders.map((order) => {
        return <OrderItem key={order.orderId} order={order} />;
      })}
    </ul>
  );
};

export default Orders;
