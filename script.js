//getrequest
apiInteraction('GET','https://jsonplaceholder.typicode.com/users',null)
.then((response)=>{
    let arrayUsers=response
    populateTable(arrayUsers);
    console.log(arrayUsers);
})
.catch((reason)=>{
    console.log(Error(reason));
})



///////funciones manejo html
const userTable = document.getElementById("userTable");
//muestro tabla y escondo forms al cargar la pag
window.addEventListener("load", function () {
    userTable.style.display = "table";
    hideForms(); 
});
//listener User
const usersLink = document.getElementById("usersLink");
usersLink.addEventListener("click", function (event) {
    event.preventDefault();
    userTable.style.display = "table";
    hideForms(); 
});
//listener adduser
const addUserLink = document.getElementById("addUserLink");
addUserLink.addEventListener("click", function (event) {
    event.preventDefault();
    userTable.style.display = "none"; 
    showForm("addUserForm");
    hideForm("modifyUserForm"); 
});
//listener modifyuser
const modifyUserLink = document.getElementById("modifyUserLink");
modifyUserLink.addEventListener("click", function (event) {
    event.preventDefault();
    userTable.style.display = "none";
    showForm("modifyUserForm");
    hideForm("addUserForm");
});
//funcion para mostrar form
function showForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.style.display = "block";
    }
}
//funcion esconder form
function hideForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.style.display = "none";
    }
}
//funcion esconde2forms
function hideForms() {
    hideForm("addUserForm");
    hideForm("modifyUserForm");
}
//funcion serializar form
function serializeForm(form) {
    const formData = new FormData(form);
    const serialized = {};
    formData.forEach((value, key) => {
        serialized[key] = value;
    });
    return serialized;
}

///////funciones manejo api
function apiInteraction(HTTPMethod,url,body){
    return new Promise((resolve,reject)=>{
        var request=new XMLHttpRequest();
        request.open(HTTPMethod,url);
        request.responseType='json';
        request.onload=()=>{
            if(request.status==200 || request.status==201){
                resolve(request.response);
            }else{
                reject(`ERROR: ${request.status}`);
            }
        }
        if(HTTPMethod=='POST' || HTTPMethod=='PUT' || HTTPMethod=='PATCH'){
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(body);
        }else{
            request.send();
        }
    })
}

function populateTable(users) {
    const userTable = document.getElementById("userTable");
    const tbody = userTable.querySelector("tbody");
    //limpio
    tbody.innerHTML = "";
    //creo rows
    users.forEach(user => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.website}</td>
            <td>${user.company.name}</td>
        `;
    });
}

function serializeForm(form) {
    const formData = new FormData(form);
    const serialized = {};
    formData.forEach((value, key) => {
        serialized[key] = value;
    });
    return serialized;
}

