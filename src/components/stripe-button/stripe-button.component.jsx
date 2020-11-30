import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51Ht1qvKxN7hJq2qQsgivjcnYaCUfI8SNjlT2AkalVdjT28eps31S30Za1EsISDkyMbdvqAwJDnndH892l61tN9ji00ptiiJTkC";
  const onToken = (token) => {
    console.log(token);
    alert("Payement Successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="Speical ECommerce"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;