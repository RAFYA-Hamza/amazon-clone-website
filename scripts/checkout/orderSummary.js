import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrencey } from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";

// this type of export named a default export
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function renderOrderSummary() {
  let cartSammurayHTML = "";

  const today = dayjs();

  cart.forEach((cartItem, index) => {
    let matchingProduct = {};

    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        matchingProduct = product;

        const deliveryOptionCart = cartItem.deliveryOptionId;

        let deliveryDate;

        deliveryOptions.forEach((deliveryOption) => {
          if (deliveryOption.id === deliveryOptionCart) {
            deliveryDate = today
              .add(deliveryOption.deliveryDays, "days")
              .format("dddd, MMMM D");
          }
        });

        cartSammurayHTML += `<div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">Delivery date: ${deliveryDate}</div>
          
          <div class="cart-item-details-grid">
            <img
              class="product-image"
              src="${matchingProduct.image}"
            />
          
            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">${matchingProduct.getPrice()}</div>
              <div class="product-quantity">
                <span> Quantity: <span class="quantity-label">${
                  cartItem.quantity
                }</span> </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-button" data-product-id=${
                  matchingProduct.id
                }>
                  Delete
                </span>
              </div>
            </div>
            
          
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              
              
              ${deliveryOptionsHTML(matchingProduct, index, cartItem)}
            </div>
          </div>
          </div>`;
      }
    });
  });

  function deliveryOptionsHTML(matchingProduct, index, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = today
        .add(deliveryOption.deliveryDays, "days")
        .format("dddd, MMMM D");

      const price =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrencey(deliveryOption.priceCents)} -`;

      const isChecked =
        cartItem.deliveryOptionId === deliveryOption.id ? "checked" : "";

      html += `
            <div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}"
            >
                <input
                id="${matchingProduct.id}"
                  type="radio"
                  ${isChecked}
                  class="delivery-option-input"
                  name="delivery-option-${index}"
                />
                <div>
                  <div class="delivery-option-date">${deliveryDate}</div>
                  <div class="delivery-option-price">${price} Shipping</div>
                </div>
            </div>
            `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSammurayHTML;

  document.querySelectorAll(".js-delete-button").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.remove();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
