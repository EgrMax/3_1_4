const renderUsers = async (users1) => {
    const response = await fetch("/api/admin");

    if (response.ok) {
        let json = await response.json()
            .then(data => allUsers(data));
    } else {
        alert("Ошибка HTTP: " + response.status);
    }

    function allUsers (users) {
        output = ''
        users.forEach(user => {
            output += ` 
              <tr> 
                    <td>${user.id}</td> 
                    <td>${user.username}</td> 
                    <td>${user.firstName}</td> 
                    <td>${user.lastName}</td>                    
                    <td>${user.age}</td> 
                    <td>${user.email}</td>                   
                    <td>${user.roles.map(role => role.roleName === 'ROLE_USER' ? 'USER' : 'ADMIN')}</td> 

              <td> 
                   <button type="button" class="btn btn-info" id="edit-user" data-action="edit" 
                    data-id="${user.id}" data-toggle="modal" data-target="modal" data-userid="${user.id}" >Edit</button> 
               </td> 
               <td> 
                   <button type="button" class="btn btn-danger" id="delete-user" data-action="delete" 
                   data-id="${user.id}" data-target="modal">Delete</button> 
                    </td> 
              </tr>`
        })
        info.innerHTML = output;
    }
}
let users = [];
const updateUser = (user) => {
    const foundIndex = users.findIndex(x => x.id === user.id);
    users[foundIndex] = user;
    renderUsers(users);
}
const removeUser = (id) => {
    users = users.filter(user => user.id !== id);
    renderUsers(users);
}

const info = document.querySelector('#allUsers');
const url = 'http://localhost:8080/api/admin'

fetch(url, {mode: 'cors'})
    .then(res => res.json())
    .then(data => {
        users = data;
        renderUsers(data)
    })

const addUserForm = document.querySelector('#addUser')
const addUsername = document.getElementById('addUsername')
const addFirstName = document.getElementById('addFirstname')
const addLastname = document.getElementById('addLastname')
const addAge = document.getElementById('addAge')
const addEmail = document.getElementById('addEmail')
const addPassword = document.getElementById('addPassword')
const addRoles = document.getElementById('addRoles')

addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const addForm = document.getElementById("addForm");
    const formData = new FormData(addForm);
    const object = {
        roles: []
    };

    formData.forEach((value, key) => {
        let roleId;
        if (key === "nameRoles") {
            if (value === "ROLE_ADMIN") {
                roleId = 1;
            } else if (value === "ROLE_USER") {
                roleId = 2;
            }
            const role = {
                id: roleId,
                roleName: value
            };
            object.roles.push(role);
            console.log(object.roles);
        } else {
            object[key] = value;
        }
    });

    fetch("api/admin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    })
        .then(res => res.json())
        .then(data => updateUser(data))
        .then(() => addForm.reset())
        .catch((e) => console.error(e))

    return show('users_table','addUser');

})

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

on(document, 'click', '#edit-user', e => {
    const userInfo = e.target.parentNode.parentNode
    document.getElementById('editId').value = userInfo.children[0].innerHTML
    document.getElementById('editUsername').value = userInfo.children[1].innerHTML
    document.getElementById('editFirstname').value = userInfo.children[2].innerHTML
    document.getElementById('editLastname').value = userInfo.children[3].innerHTML
    document.getElementById('editAge').value = userInfo.children[4].innerHTML
    document.getElementById('editEmail').value = userInfo.children[5].innerHTML
    document.getElementById('editRoles').value = userInfo.children[6].innerHTML
    document.getElementById('editPassword').value = userInfo.children[7].innerHTML

    $("#modalEdit").modal("show")
})

const editUserForm = document.querySelector('#modalEdit')
editUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById('formEdit'));
    const object = {
        roles: []
    };

    formData.forEach((value, key) => {
        let roleId;
        if (key === "nameRoles") {
            if (value === "ROLE_ADMIN") {
                roleId = 1;
            } else if (value === "ROLE_USER") {
                roleId = 2;
            }
            const role = {
                id: roleId,
                roleName: value
            };
            object.roles.push(role);
            console.log(object.roles);
        } else {
            object[key] = value;
        }
    });

    fetch("api/admin", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    })
        .then(res => res.json()).then(data => updateUser(data))
        .catch((e) => console.error(e))

    $("#modalEdit").modal("hide")
})


let currentUserId = null;
const deleteUserForm = document.querySelector('#modalDelete')
deleteUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetch('http://localhost:8080/api/admin/' + currentUserId, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            removeUser(currentUserId);
            deleteUserForm.removeEventListener('submit', () => {
            });
            $("#modalDelete").modal("hide")
        })
})

on(document, 'click', '#delete-user', e => {
    const fila2 = e.target.parentNode.parentNode
    currentUserId = fila2.children[0].innerHTML

    document.getElementById('delId').value = fila2.children[0].innerHTML
    document.getElementById('delUsername').value = fila2.children[1].innerHTML
    document.getElementById('delFirstname').value = fila2.children[2].innerHTML
    document.getElementById('delLastname').value = fila2.children[3].innerHTML
    document.getElementById('delAge').value = fila2.children[4].innerHTML
    document.getElementById('delEmail').value = fila2.children[5].innerHTML
    document.getElementById('delRoles').value = fila2.children[6].innerHTML

    $("#modalDelete").modal("show")
})

const userUrl = 'http://localhost:8080/api/user'
let loggedInUser = document.querySelector('#User')

fetch(userUrl)
    .then(res => res.json())
    .then(data => {
        loggedInUser.innerHTML = `
                    <td>${data.id}</td> 
                    <td>${data.username}</td> 
                    <td>${data.firstName}</td> 
                    <td>${data.lastName}</td>                    
                    <td>${data.age}</td> 
                    <td>${data.email}</td>                   
                    <td>${data.roles.map(role => role.roleName === 'ROLE_USER' ? 'USER' : 'ADMIN')}</td> 
                                `;
    })