const userForm = document.getElementById("user-form");
const userEntries = retrieveEntries();
const details = document.getElementById("user-entries");


function retrieveEntries() {
  return JSON.parse(localStorage.getItem("UserEntries") || "[]");
}

function displayEntries() {
  const tableEntries = userEntries
    .map(({ name, email, password, dob, acceptTerms }) => `
      <tr>
        <td class="border px-4 py-2">${name}</td>
        <td class="border px-4 py-2">${email}</td>
        <td class="border px-4 py-2">${password}</td>
        <td class="border px-4 py-2">${dob}</td>
        <td class="border px-4 py-2">${acceptTerms}</td>
      </tr>
    `)
    .join("\n");
  const table = `
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Password</th>
          <th class="px-4 py-2">Dob</th>
          <th class="px-4 py-2">Accepted terms?</th>
        </tr>
      </thead>
      <tbody>
        ${tableEntries}
      </tbody>
    </table>
  `;

  details.innerHTML = table;
}

function saveUserForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  const currentYear = new Date().getFullYear();
  const birthYear = dob.split("-");
  const year = birthYear[0];
  const age = currentYear - year;

  
  if (age < 18 || age > 55) {
    document.getElementById("dob").style.border = "1px solid red";
    return alert("You must be between 18 and 55 years old to register");
  }

  document.getElementById("dob").style.border = "none";

  const entry = { name, email, password, dob, acceptTerms };
  userEntries.push(entry);

  localStorage.setItem("UserEntries", JSON.stringify(userEntries));
  displayEntries();
  userForm.reset();
}

userForm.addEventListener("submit", saveUserForm);
displayEntries();
