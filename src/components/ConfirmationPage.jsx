import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderConfirmation from "./OrderConfirmation";
import { testOrder } from "../sampleTestData";

function ConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState("");
  const getOrder = async () => {
    const response = await fetch(`/api/orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    setOrder(data);
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div>
      Hello World from {id}!
      <OrderConfirmation order={order} testOrder={testOrder} />
    </div>
  );
}

export default ConfirmationPage;
