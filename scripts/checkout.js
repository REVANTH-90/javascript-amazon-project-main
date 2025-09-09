import{cart,deleteProduct} from '../data/cart.js';
import{products} from '../data/products.js';
import{formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions} from '../data/deliveryOptions.js';
let carthtml='';

cart.forEach((cartItem)=>{
    let matchingItem;
    products.forEach((productItem)=>{
        if(cartItem.productId === productItem.id){
            matchingItem = productItem;
        }
    })
const productId = cartItem.productId;
let deliveryOptionID=cartItem.deliveryOptionID;
let deliveryOption;
deliveryOptions.forEach((option)=>{
  if(option.id===deliveryOptionID){
    deliveryOption=option;
  }
});
const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

   carthtml += `
    <div class="cart-item-container js-product-id-${productId}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(productId,cartItem)}
              </div>
            </div>
          </div>
    
    
    `
})
function deliveryOptionsHTML(productId,cartItem){
  let optionsHTML='';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? 'FREE Shipping' : `$${formatCurrency(deliveryOption.priceCents)}`;
    const checked=deliveryOption.id===cartItem.deliveryOptionID;
    optionsHTML+=
    `
     <div class="delivery-option">
                <input type="radio" ${checked ? 'checked' : ''} class="delivery-option-input"
               name="delivery-option-${productId}">
                 <div>
                 <div class="delivery-option-date">
                        ${dateString}
                     </div>
                 <div class="delivery-option-price">
                        ${priceString}
           </div>
        </div>
     </div>
    
    `

  });
  return optionsHTML;
}

document.querySelector('.js-order-summary').innerHTML = carthtml;
document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
   const productId = link.dataset.productId;
   deleteProduct(productId);
   const container =document.querySelector(`.js-product-id-${productId}`);
   container.remove();
  });
});