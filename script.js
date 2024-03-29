const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionariesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = " <h2><strong>Person</strong> Wealth</h2> ";

  providedData.forEach((item) => {
    const list = document.createElement("div");
    list.classList.add("person");
    list.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(list);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function showMillionaries() {
  data = data.filter((item) => item.money > 1000000);
  updateDOM();
}

function calculateWealth() {
  const totalWealth = data.reduce((acc, user) => {
    return acc + user.money;
  }, 0);

  const wealth = document.createElement("h3");
  wealth.innerHTML = `Total Wealth: <strong>${formatMoney(
    totalWealth
  )}</strong>`;

  main.appendChild(wealth);
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionariesBtn.addEventListener("click", showMillionaries);
calculateWealthBtn.addEventListener("click", calculateWealth);
