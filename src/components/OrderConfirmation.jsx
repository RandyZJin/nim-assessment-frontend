import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation(props) {
  const { order } = props;
  let orderTotal = 0;
  return (
    <div className={styles.container}>
      Thank you for your order! Your order is on the way.
      <table>
        <thead>
          <tr>Order ID: {order.id}</tr>
          <tr>Delivering to: {order.name}</tr>
          <tr>Phone Number: {order.phone}</tr>
          <tr>Address: {order.address}</tr>
          <th>item</th> <th>unit price</th> <th>quantity</th> <th>subtotal</th>
        </thead>
        <tbody>
          {order &&
            order.items.map((item) => {
              orderTotal += item.item.price * item.quantity;
              return (
                <tr>
                  <td>{item.item.name}</td>
                  <td>${item.item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.item.price * item.quantity}</td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>Your order total is: ${orderTotal}</tr>
        </tfoot>
      </table>
    </div>
  );
}

export default OrderConfirmation;
