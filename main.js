// czytanie z pliku html jakie tam dania mamy, żeby wrzucic do tablicy
let content = document.querySelectorAll(".dish");
var products = [];

let product = document.querySelectorAll(".dish-name");
let price = document.querySelectorAll(".price-h");



for (let i=0; i < content.length; i++){

  products.push({
    name: product[i].innerHTML,
    tag: product[i].innerHTML,
    price: price[i].innerHTML,
    inCart: 0
  });

  console.log(products)

}

for (let i=0; i < content.length; i++){
  content[i].addEventListener('click', () =>{
    cartNumbers(products[i]);
    totalCost(products[i]);

  })
}


// funkcja odświeżająca licznik, zeby po każdym odświeżeniu karty nie było 0, tylko wartość zapamietana przez przeglądarkę
function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers){
    document.querySelector('.basket span').textContent = productNumbers;
  }
}
// dodanie liczby produktw do licznika na gorze strony
function cartNumbers(products) {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.basket span').textContent = productNumbers +1;
  } else {
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.basket span').textContent = 1;
  }
  setItems(products)
}



function setItems(products){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

if(cartItems != null){
  if (cartItems[products.tag] == undefined) {
    cartItems = {
      ...cartItems,
      [products.tag]: products
    }
  }

  cartItems[products.tag].inCart += 1;
} else {
  products.inCart = 1;
  cartItems = {
    [products.tag] : products
  }
}
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}


// zliczanie ceny ogolnej - koncowej
function totalCost(products){

  let cartCost = localStorage.getItem('totalCost');

  if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + parseInt(products.price));
  } else {
      localStorage.setItem("totalCost", parseInt(products.price));
  }

}
//funkcja do wyłuskiwania ceny dostawy po kliknięciu koszyka
function getDeliveryCost(){
  let delCost = document.getElementById("deliveryCost").innerHTML;
  var r = /\d+/;
  var s = delCost;
  var wynik = s.match(r);

  localStorage.setItem("costOfDelivery", wynik);
}
//funkcja do wyłuskiwania minimalnego zamówienia
function getMinOrder(){
  let minOrder1 = document.getElementById("minOrder").innerHTML;
  var d = /\d+/;
  var a = minOrder1;
  var wyn = a.match(d);

  localStorage.setItem("minOrder", wyn);
}

  $(document).ready(function(){
  $('#KodPocztowy').mask('00-000');
  $('#nrTelefonu').mask('000-000-000');
  $('#numerKarty').mask('00-0000-0000-0000-0000-0000');
  $('#dataWaznosci').mask('00/00');
  $('#cvv').mask('000');
});

//Funkcja do obsługiwania klikania w rzeczy w koszyku
//Funkcja do usuwania rzeczy z koszyka
function removeItem(dishName){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let cartCost = localStorage.getItem('totalCost');
  cartCost = parseInt(cartCost);
  localStorage.setItem("totalCost", cartCost - (parseInt(cartItems[dishName].price) * parseInt(cartItems[dishName].inCart)));

  //Zmiana liczby w koszyku
  let cartNum = localStorage.getItem("cartNumbers");
  cartNum = parseInt(cartNum);
  localStorage.setItem("cartNumbers", cartNum - parseInt(cartItems[dishName].inCart));


  //Usunięcie z productsInCart
  delete cartItems[dishName];
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));

  onLoadCartNumbers();
  displayCart();
}

// Funkcja do dodawania ilości dania do koszyka
function increaseQuantity(dishName){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  cartItems[dishName].inCart += 1;

  //Zmiana kosztu
  let cartCost = localStorage.getItem('totalCost');
  cartCost = parseInt(cartCost);
  localStorage.setItem("totalCost", cartCost + parseInt(cartItems[dishName].price) );

  //Zmiana liczby w koszyku
  let cartNum = localStorage.getItem("cartNumbers");
  cartNum = parseInt(cartNum);
  localStorage.setItem("cartNumbers", cartNum + 1);


  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  onLoadCartNumbers();
  displayCart();

}
//Funkcja do zmiejszania ilości rzeczy w koszyku
function decreaseQuantity(dishName){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  qty = cartItems[dishName].inCart;
  if(qty == 1){
    removeItem(dishName);
  }else{
    qty -= 1;
    cartItems[dishName].inCart = qty;

    //Zmiana kosztu
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - parseInt(cartItems[dishName].price) );

    //Zmiana liczby w koszyku
    let cartNum = localStorage.getItem("cartNumbers");
    cartNum = parseInt(cartNum);
    localStorage.setItem("cartNumbers", cartNum - 1);

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    onLoadCartNumbers();
    displayCart();
  }
}

// wyświetlanie koszyka
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');
  let costOfdelivery = localStorage.getItem('costOfDelivery');
  let totalCost = parseInt(costOfdelivery) + parseInt(cartCost);
  if(cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="row">
      <div class="col-5">
      <button class="btnDelete" ><i class="fa fa-trash" data-name="${item.name}"></i></button>
        <span>${item.name}</span>
      </div>
      <div class="col-2">
        ${item.price} zł
      </div>
      <div class="col-3">
        <button class="btnMinus" ><i class="fa fa-minus-square" data-name="${item.name}"></i></button>
          <span>${item.inCart}</span>
        <button class="btnPlus" ><i class="fa fa-plus-square" data-name="${item.name}"></i></button>
      </div>
      <div class="col-2">
        ${item.inCart * item.price} zł
      </div>
      </div>
      `;
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
      <hr class="solid">
        <h4 class="delivery">
          Dostawa: ${costOfdelivery} zł
        </h4>
        <h4 class="totalCost">
          Razem: ${totalCost}  zł
        </h4>

    `;
  }

}
onLoadCartNumbers();
displayCart();


let productContainer = document.querySelector(".products");

productContainer.onclick = function(e){

  if(e.target && e.target.classList.contains("fa-trash")){
      const dishName = e.target.dataset.name;
      console.log(dishName);
      removeItem(dishName);
  }

  if(e.target && e.target.classList.contains("fa-plus-square")){
    const dishName = e.target.dataset.name;
      console.log(dishName);
      increaseQuantity(dishName);
  }

  if(e.target && e.target.classList.contains("fa-minus-square")){
    const dishName = e.target.dataset.name;
      console.log(dishName);
      decreaseQuantity(dishName);
  }
}
//Funkcja do dezaktywacji miejsc do wpisywania po naciśnięciu gotówki
function disableWhenCash(){
  if(document.getElementById("Cash").checked){

    document.getElementById("numerKarty").setAttribute("disabled" , "true");
    document.getElementById("imieWlasciciela").setAttribute("disabled" , "true");
    document.getElementById("dataWaznosci").setAttribute("disabled" , "true");
    document.getElementById("cvv").setAttribute("disabled" , "true");
  }
  if(document.getElementById("Card").checked){

    document.getElementById("numerKarty").removeAttribute("disabled");
    document.getElementById("imieWlasciciela").removeAttribute("disabled");
    document.getElementById("dataWaznosci").removeAttribute("disabled");
    document.getElementById("cvv").removeAttribute("disabled");
  }
}
//Funkcja sprawdzająca czy wszystko jest poprawnie i przepuszczająca
//do kolejnego okna
function finalizeOrder(){

  var name = document.getElementById("imie").value;
  var surname = document.getElementById("nazwisko").value;
  var adress = document.getElementById("adres").value;
  var houseNum = document.getElementById("nrDomuNrMieszkania").value;
  var city = document.getElementById("Miasto").value;
  var postcode = document.getElementById("KodPocztowy").value;

  adres = {
    name: name,
    surname: surname,
    adress: adress,
    houseNum: houseNum,
    city: city,
    postcode: postcode
  }

  for (const property in adres) {
    if(adres[property].length == 0){
      window.alert("Proszę uzupełnić dane dostawy!");
      return;
    }
  }

  var total = localStorage.getItem("totalCost");
  var minimal = localStorage.getItem("minOrder");

  if(parseInt(total) < parseInt(minimal)){
    window.alert("kwota minimalna zamówienia dla tej restauracji to " + minimal +  " zł, musisz coś jeszcze dokupić... ");
    return;
  }

  localStorage.setItem("adres", JSON.stringify(adres));
  if(document.getElementById("Cash").checked){
    console
    window.location.href = "summary_window0.html";

    //window.location.href("summay_window0.html");
  }else if(document.getElementById("Card").checked){
    var cardNum = document.getElementById("numerKarty").value;
    var ownerName = document.getElementById("imieWlasciciela").value;
    var expirationDate = document.getElementById("dataWaznosci").value;
    var cvv = document.getElementById("cvv").value;

    cardInfo = {
      cardNum: cardNum,
      ownerName: ownerName,
      expirationDate: expirationDate,
      cvv: cvv,
    }

    for (const property in cardInfo) {
      if(cardInfo[property].length == 0){
        window.alert("Proszę uzupełnić dane karty!");
        return;
      }
    }

      localStorage.setItem("cardInfo", JSON.stringify(cardInfo));
      window.location.href = "summary_window0.html";


  }
}

//funkcja do usuwania opinii
function disableOpinion(){
  console.log(document.getElementById("opinionInput").value)
  document.getElementById("opinionInput").setAttribute("disabled","true");
  document.getElementById("sendOpinion").disable=true;
}
