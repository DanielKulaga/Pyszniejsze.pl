function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementById("sum_order");
    let cartCost = localStorage.getItem('totalCost');
    let deliveryCost = localStorage.getItem('costOfDelivery');
    let totalCost = parseInt(deliveryCost) + parseInt(cartCost);
    if(cartItems && productContainer) {
      Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
        <div class="row">
                <div class="col-5">
                  <span>${item.name}</span>
                </div>
                <div class="item_info">
                <div class="col-2">
                  ${item.price} zł
                </div>
                <div class="col-3">
                    <span>${item.inCart}</span>
                </div>
                <div class="col-2">
                  ${item.inCart * item.price} zł
                </div>
                </div>
                <div style="clear:both;"></div>
         </div>
        `;
      });

      productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <hr class="solid">
          <h4 class="delivery">
            <u>Dostawa:</u> ${deliveryCost} zł
          </h4>
          <h4 class="totalCost">
          <u>Razem:</u> ${totalCost}  zł
          </h4>
        </div>
      `;
    }
}
function displayAddress(){
    let address = localStorage.getItem("adres");
    address = JSON.parse(address);
    let productContainer1 = document.getElementById("delivery");
    if(address && productContainer1) {
      productContainer1.innerHTML += `
        <div class="addressTotalContainer">
        <!--<hr class="solid">-->
          <h4 class="delivery_address">
            <u></u>ul.${address.adress} ${address.houseNum}</br>      ${address.postcode} ${address.city}
          </h4>
        </div>
      `;
    };
    }





window.onload = function afterPageLoading(){
  displayCart();
  displayAddress();
}
