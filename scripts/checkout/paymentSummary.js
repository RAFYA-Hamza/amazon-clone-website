import { cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { formatCurrencey, formatEstimatedTax } from "../utils/money.js";

export function renderPaymentSummary() {
  let orderSummary = {};
  let orderSammurayHTML = "";

  let quantityItems = 0;
  let priceCents = 0;
  let shippingHandling = 0;
  let totalBeforeTax = 0;
  let estimatedTax = 0;
  let orderTotal = 0;

  cart.forEach((product) => {
    const productId = product.productId;
    const quantity = product.quantity;

    products.forEach((product) => {
      if (product.id === productId) {
        priceCents += Number(product.priceCents * quantity);
        quantityItems += quantity;
      }
    });

    deliveryOptions.forEach((option) => {
      if (product.deliveryOptionId === option.id) {
        shippingHandling += Number(option.priceCents);
      }
    });
  });
  totalBeforeTax = formatCurrencey(priceCents + shippingHandling);

  estimatedTax = formatEstimatedTax(totalBeforeTax);

  orderTotal = (Number(estimatedTax) + Number(totalBeforeTax)).toFixed(2);

  orderSummary = {
    quantity: quantityItems,
    priceCents: formatCurrencey(priceCents),
    shippingHandling: formatCurrencey(shippingHandling),
    totalBeforeTax: totalBeforeTax,
    estimatedTax: estimatedTax,
    orderTotal: orderTotal,
  };

  const checkoutItem = document.querySelector(".js-checkout-header");
  checkoutItem.innerHTML = `${orderSummary.quantity} Items`;

  orderSammurayHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (${orderSummary.quantity}):</div>
      <div class="payment-summary-money">$${orderSummary.priceCents}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${orderSummary.shippingHandling}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${orderSummary.totalBeforeTax}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${orderSummary.estimatedTax}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${orderSummary.orderTotal}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
    `;

  document.querySelector(".js-payment-summary").innerHTML = orderSammurayHTML;
}
