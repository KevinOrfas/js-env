import './index.css';
import { getUsers } from './api/userApi.js';

//Populate table of user via API call
getUsers().then(result => {
    let usersBody = '';

    result.forEach(user => {
        usersBody+= `<tr>
            <td><a href="#" data-id="${user.id}" class="deleteUSer">Delete</td>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
        </tr>`;
    });
    global.document.getElementById('users').innerHTML = usersBody;
})


