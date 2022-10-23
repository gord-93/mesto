class Api {
    constructor(options) {
        this._options = options;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserAttribute() {
        return fetch(this._options.baseUrl + '/users/me', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => this._checkResponse(res));
    }

    getInitialCards() {
        return fetch (this._options.baseUrl + '/cards', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => this._checkResponse(res));
    }

    getUserAndCards() {
        return Promise.all([this.getUserAttribute(), this.getInitialCards()]);
    }

    getCardByID(cardId) {
        return fetch (this._options.baseUrl + '/cards/' + cardId, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => this._checkResponse(res));
    }

    setUserAttribute({name, about}) {
        return fetch(this._options.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            }),
        })
        .then((res) => this._checkResponse(res))
    }

    addCard({title, subtitle, author, text, link, secondLink, date}) {
        return fetch(this._options.baseUrl + '/cards', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                subtitle: subtitle,
                link: link,
                author: author,
                text: text,
                secondLink: secondLink,
                date: date,
            }),
        })
        .then((res) => this._checkResponse(res))
    }

    removeCard(cardId) {
        return fetch(this._options.baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => this._checkResponse(res));
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(this._options.baseUrl + '/cards/' + id + '/likes/', {
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => this._checkResponse(res))
        } else {
            return fetch(this._options.baseUrl + '/cards/' + id + '/likes/', {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => this._checkResponse(res))
        }
    }

    changeAvatar(avatar) {
        return fetch(this._options.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            avatar: avatar,
            }),
        })
        .then((res) => this._checkResponse(res));
    }
}

export const api = new Api({
    baseUrl: 'http://localhost:3000'
});


