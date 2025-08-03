document.getElementById('add-item').addEventListener('click', function() {
  const itemName = document.getElementById('item').value.trim();
  const itemPrice = parseFloat(document.getElementById('price').value);

  if (itemName && !isNaN(itemPrice) && itemPrice > 0) {
    addItemToList(itemName, itemPrice);
    document.getElementById('item').value = '';
    document.getElementById('price').value = '';
    saveListToLocalStorage();  // Salva a lista após adicionar um item
  } else {
    alert('Por favor, insira um nome de item válido e um preço!');
  }
});

function addItemToList(name, price, quantity = 1) {
  const shoppingList = document.getElementById('shopping-list');
  const li = document.createElement('li');
  
  let totalPrice = price * quantity;  // Calcula o preço total

  li.innerHTML = `
    <span class="item-name">${name}</span> - <span class="price">R$ ${totalPrice.toFixed(2)}</span>
    <span class="quantity">Quantidade: ${quantity}</span>
    <button class="increase-quantity">Aumentar</button>
    <button class="edit-item">Editar</button>
    <button class="delete-item">Excluir</button>
  `;

  // Aumentar a quantidade
  li.querySelector('.increase-quantity').addEventListener('click', function() {
    quantity++;
    totalPrice = price * quantity;
    li.querySelector('.price').textContent = `R$ ${totalPrice.toFixed(2)}`;
    li.querySelector('.quantity').textContent = `Quantidade: ${quantity}`;
    updateTotal();
    saveListToLocalStorage();
  });

  // Editar item
  li.querySelector('.edit-item').addEventListener('click', function() {
    const newName = prompt('Digite o novo nome do item:', name);
    const newPrice = prompt('Digite o novo preço do item:', price.toFixed(2));

    if (newName && !isNaN(parseFloat(newPrice)) && parseFloat(newPrice) > 0) {
      name = newName;
      price = parseFloat(newPrice);
      totalPrice = price * quantity;
      
      li.querySelector('.price').textContent = `R$ ${totalPrice.toFixed(2)}`;
      li.querySelector('.quantity').textContent = `Quantidade: ${quantity}`;
      li.querySelector('.item-name').textContent = name;  // Atualiza o nome do item
      updateTotal();
      saveListToLocalStorage();
    }
  });

  // Excluir item
  li.querySelector('.delete-item').addEventListener('click', function() {
    shoppingList.removeChild(li);
    updateTotal();
    saveListToLocalStorage();
  });

  shoppingList.appendChild(li);
  updateTotal();
  saveListToLocalStorage();
}

function saveListToLocalStorage() {
  const items = [];
  const listItems = document.querySelectorAll('#shopping-list li');

  listItems.forEach(item => {
    const name = item.querySelector('.item-name').textContent;
    const price = parseFloat(item.querySelector('.price').textContent.replace('R$ ', ''));
    const quantity = parseInt(item.querySelector('.quantity').textContent.replace('Quantidade: ', ''));
    items.push({ name, price, quantity });
  });

  localStorage.setItem('shoppingList', JSON.stringify(items));  // Salva a lista como string no LocalStorage
}

function loadListFromLocalStorage() {
  const savedList = localStorage.getItem('shoppingList');
  if (savedList) {
    const items = JSON.parse(savedList);
    items.forEach(item => {
      addItemToList(item.name, item.price, item.quantity);
    });
  }
}

document.addEventListener('DOMContentLoaded', loadListFromLocalStorage);

function updateTotal() {
  const items = document.querySelectorAll('#shopping-list li');
  let total = 0;

  items.forEach(item => {
    const priceText = item.querySelector('.price').textContent;
    total += parseFloat(priceText.replace('R$ ', '').replace(',', '.'));  // Remove o 'R$' e converte para número
  });

  document.getElementById('total-price').textContent = `R$ ${total.toFixed(2)}`;
}