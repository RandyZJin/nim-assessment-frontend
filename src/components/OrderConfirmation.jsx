import html2pdf from "html2pdf.js";
import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation(props) {
  const { order } = props;
  const downloadAsPdf = () => {
    const receipt = document.querySelector("#receipt");
    html2pdf(receipt);
  };
  let orderTotal = 0;
  return (
    <div className={styles.container}>
      Thank you for your order! Your order is on the way.
      <div id="receipt">
        <div>Order ID: {order.id}</div>
        <div>Delivering to: {order.name}</div>
        <div>Phone Number: {order.phone}</div>
        <div>Address: {order.address}</div>

        <table>
          <thead>
            <tr>
              <th>item</th> <th>unit price</th> <th>quantity</th>{" "}
              <th>subtotal</th>
            </tr>
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
        </table>
        <div>Your order total is: ${orderTotal}</div>
      </div>
      <button onClick={() => downloadAsPdf()}>Print Receipt</button>
    </div>
  );
}

export default OrderConfirmation;
