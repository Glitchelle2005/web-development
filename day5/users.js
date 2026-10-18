const loadUsersButton = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const statusMessage = document.getElementById("status");
const usersList = document.getElementById("users-list");

let users = [];
let usersLoaded = false;

function renderUsers(list) {
  usersList.replaceChildren();

  if (list.length === 0) {
    statusMessage.textContent = "No users match your filter.";
    return;
  }

  list.forEach((user) => {
    const listItem = document.createElement("li");
    const name = document.createElement("h2");
    const email = document.createElement("p");
    const city = document.createElement("p");
    const company = document.createElement("p");

    name.textContent = user.name;
    email.textContent = `Email: ${user.email}`;
    city.textContent = `City: ${user.address.city}`;
    company.textContent = `Company: ${user.company.name}`;

    listItem.append(name, email, city, company);
    usersList.appendChild(listItem);
  });

  statusMessage.textContent = `Showing ${list.length} user${list.length === 1 ? "" : "s"}.`;
}

async function loadUsers() {
  loadUsersButton.disabled = true;
  statusMessage.textContent = "Loading users...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    const loadedUsers = await response.json();
    if (!Array.isArray(loadedUsers)) {
      throw new Error("The response did not contain a list of users.");
    }

    users = loadedUsers;
    usersLoaded = true;
    const query = filterInput.value.trim().toLowerCase();
    renderUsers(users.filter((user) => user.name.toLowerCase().includes(query)));
  } catch (error) {
    users = [];
    usersLoaded = false;
    usersList.replaceChildren();
    statusMessage.textContent = `Error loading users: ${
      error instanceof Error ? error.message : String(error)
    }`;
  } finally {
    loadUsersButton.disabled = false;
  }
}

loadUsersButton.addEventListener("click", loadUsers);

filterInput.addEventListener("input", () => {
  if (!usersLoaded) {
    return;
  }

  const query = filterInput.value.trim().toLowerCase();
  renderUsers(users.filter((user) => user.name.toLowerCase().includes(query)));
});
