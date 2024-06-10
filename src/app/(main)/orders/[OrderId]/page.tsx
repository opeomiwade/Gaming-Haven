const OrderPage: React.FC<{ params: any }> = ({ params }) => {
  return <main>{params.orderId}</main>;
};

export default OrderPage;
