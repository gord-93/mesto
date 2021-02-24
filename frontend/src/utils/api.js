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
            headers: this._options.headers,
        })
        .then((res) => this._checkResponse(res));
    }

    getInitialCards() {
        return fetch (this._options.baseUrl + '/cards', {
            headers: this._options.headers,
        })
        .then((res) => this._checkResponse(res));
    }

    getUserAndCards() {
        return Promise.all([this.getUserAttribute(), this.getInitialCards()]);
    }

    setUserAttribute({name, about}) {
        return fetch(this._options.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                about: about
            }),
        })
        .then((res) => this._checkResponse(res))
    }

    addCard({name, link}) {
        return fetch(this._options.baseUrl + '/cards', {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        })
        .then((res) => this._checkResponse(res))
    }

    removeCard(cardId) {
        return fetch(this._options.baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: this._options.headers,
        })
        .then((res) => this._checkResponse(res));
    }

    likeCard(cardId) {
        return fetch(this._options.baseUrl + '/cards/likes/' + cardId, {
            method: 'PUT',
            headers: this._options.headers,
        })
        .then((res) => this._checkResponse(res))
    }

    dislikeCard(cardId) {
        return fetch(this._options.baseUrl + '/cards/likes/' + cardId, {
            method: 'DELETE',
            headers: this._options.headers,
        })
        .then((res) => this._checkResponse(res));
    }

    changeLikeCardStatus(cardId, isLiked) {
        if(isLiked) {
            return this.dislikeCard(cardId);
        } else {
            return this.likeCard(cardId);
        }
    }

    changeAvatar(avatar) {
        return fetch(this._options.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
            avatar: avatar,
            }),
        })
        .then((res) => this._checkResponse(res));
    }
}

export const api = new Api({
    baseUrl: 'http://gordievsky.students.nomoreparties.space',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
});


