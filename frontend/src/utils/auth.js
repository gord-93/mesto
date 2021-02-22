export const BASE_URL = 'http://localhost:3000';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'password': password,
            'email': email 
        })
    })
    .then((res) => {
        if (res.status === 201) {
            return res.json();
        }
        if (res.status === 400) {
            console.log('Некорректно заполнено одно из полей');
            return false;
        }
    });
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'password': password,
            'email': email
        })
    })
    .then ((res) => {
        if (res.status === 200) {
            return res.json();
        }
        if (res.status === 400) {
            console.log('Не передано одно из полей ')
            return false;
        }
        if (res.status === 401) {
            console.log('Пользователь с email не найден')
            return false
        }
    })
    .then((data) => {
        if (data.token) {
            localStorage.setItem('jwt', data.token);
            return data;
        }
    });
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        }
    })
    .then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        if (res.status === 401) {
            console.log('Токен не передан или передан не в том формате');
            return false;
        }
    })
    .then((data) => data);
}