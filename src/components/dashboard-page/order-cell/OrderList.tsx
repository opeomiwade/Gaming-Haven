import { Order } from "@/types/types";
import OrderItem from "./OrderItem";
import EmptyPlaceHolder from "@/components/ui/EmptyPlaceHolder";

const Orders: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return orders.length > 0 ? (
    <ul className="space-y-6 h-[60%] overflow-y-auto overflow-x-hidden">
      {orders.map((order) => {
        return <OrderItem key={order.orderId} order={order} />;
      })}
    </ul>
  ) : (
    <EmptyPlaceHolder
      buttonText="Browse Marketplace"
      href="/"
      messageText="You have made no orders"
    />
  );
};

export default Orders;
