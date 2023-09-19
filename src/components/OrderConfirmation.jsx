function OrderConfirmation(props) {
  const { order } = props;
  if (order) {
    console.table(order);
  }
  return <div>Thank you for your order! Your order is on the way.</div>;
}

export default OrderConfirmation;
