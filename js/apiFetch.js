const usersContainer = document.querySelector('.usersContainer'); // Agregué el punto antes de "usersContainer"

function getJson() { // Cambié "getJason" a "getJson"
  return new Promise((resolve, reject) => {
    resolve(getInfoUsers())
  });
}

function getInfoUsers() {
  const url = 'https://reqres.in/api/users?delay=3';
  fetch(url)
    .then(response => response.json())
    .then(dataJson => {
      userCreation(dataJson);
      let jsonString = JSON.stringify(dataJson);
      storageData(jsonString);
    })
    .catch(error => console.log(error));
}

function userCreation(dataJson) { 
  dataJson.data.map(user => {
    tableFiller(user);
  });
}

function storageData(obData) {
  localStorage.setItem('storageData', obData);

  const today = new Date();
  const time = today.getTime();
  localStorage.setItem('timeData', time);
}

function tableFiller(users) {
  const tr = document.createElement('tr');

  const th = document.createElement('th');
  th.scope = 'row';
  th.textContent = users.id;
  tr.appendChild(th);

  const tdNombre = document.createElement('td');
  tdNombre.textContent = users.first_name;
  tr.appendChild(tdNombre);

  const tdApellido = document.createElement('td');
  tdApellido.textContent = users.last_name;
  tr.appendChild(tdApellido);

  const tdCorreo = document.createElement('td');
  tdCorreo.textContent = users.email;
  tr.appendChild(tdCorreo);

  const tdFoto = document.createElement('td');
  const img = document.createElement('img');
  img.src = users.avatar;
  img.style.width = '50px';
  img.style.height = '50px';
  img.style.borderRadius = '100px';
  tdFoto.appendChild(img);
  tr.appendChild(tdFoto);

  // Agregar la fila completa a la tabla
  usersContainer.appendChild(tr);
}

function userList() {
  document.getElementById("user-button").disabled = true;
  const storeD = localStorage.getItem('storageData');1
  const date = localStorage.getItem('timeData');
  const today = new Date();
  const time = today.getTime();
  const dif = (time - date) / 1000 / 60;

  if (storeD === null) {
    getJson(); 
  } else {
    if (dif > 1) {
      getJson(); 
    } else {
      userCreation(JSON.parse(storeD));
    }
  }
}