let currentTable = null;
let orders = {};

function selectTable(tableNumber) {
  currentTable = tableNumber;
  updateCart();
}

function showMenu(type) {
  document.querySelectorAll('.menu-section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(type).classList.remove('hidden');
}

function addToCart(itemName, price) {
  if (!currentTable) {
    alert("Veuillez sélectionner une table.");
    return;
  }
  if (!orders[currentTable]) orders[currentTable] = [];
  const item = orders[currentTable].find(i => i.name === itemName);
  if (item) {
    item.qty += 1;
  } else {
    orders[currentTable].push({ name: itemName, price, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");
  cartList.innerHTML = "";
  let total = 0;

  if (!orders[currentTable]) return;

  orders[currentTable].forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.qty}`;
    cartList.appendChild(li);
    total += item.price * item.qty;
  });

  totalSpan.textContent = total;
}

function sendOrder() {
  if (!currentTable || !orders[currentTable] || orders[currentTable].length === 0) {
    alert("Aucune commande à envoyer.");
    return;
  }

  const popup = document.getElementById("popup");
  const popupItems = document.getElementById("popup-items");
  popupItems.innerHTML = "";

  orders[currentTable].forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.qty}`;
    popupItems.appendChild(li);
  });

  popup.classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

function closeTable() {
  if (!currentTable) {
    alert("Sélectionnez d'abord une table.");
    return;
  }
  delete orders[currentTable];
  currentTable = null;
  updateCart();
}
