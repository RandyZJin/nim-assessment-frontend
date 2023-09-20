import React, { useState } from "react";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const placeOrder = async () => {
    let validOrder = true;
    setErrorMessage("");
    const emptyFields = [];
    const phoneArray = phone.trim().split("");
    const phoneValidationArray = phoneArray.filter(
      (x) =>
        x === "(" ||
        x === ")" ||
        x === "-" ||
        (Number(x) >= 0 && Number(x) <= 9)
    );
    if (!name) {
      emptyFields.push("Name");
    }
    if (!phone) {
      emptyFields.push("Phone Number");
    }
    if (!address) {
      emptyFields.push("Address");
    }
    if (emptyFields.length) {
      const missingMessage = `Please fill out the following fields: ${emptyFields.join(
        ", "
      )}.`;
      setErrorMessage(missingMessage);
      validOrder = false;
    }
    if (phoneArray.length !== phoneValidationArray.length) {
      setErrorMessage("Please ensure that the phone number is valid");
      validOrder = false;
    }
    const formattedPhone = phoneValidationArray.filter(
      (x) => Number(x) >= 0 && Number(x <= 9)
    );
    formattedPhone.splice(0, 0, "(");
    formattedPhone.splice(4, 0, ")");
    formattedPhone.splice(8, 0, "-");
    setPhone(formattedPhone.join(""));
    if (validOrder) {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          items: order
        })
      });
      const data = await response.json();
      if (response.status === 200) {
        setTimeout(() => {
          window.location.href = `/order-confirmation/${data.id}`;
        }, 1000);
      }
    }
  };
  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
            </label>
          </div>
        </form>

        <div>{errorMessage && errorMessage}</div>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
