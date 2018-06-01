import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

class ComponentApi extends PolymerElement {
    static get template() {
        return html`
        <iron-ajax
            id="checkUsername"
            url="https://apidev.dac.city/users/{{username}}"
            handle-as="json"
            debounce-duration="300">
        </iron-ajax>
        <iron-ajax
            id="login"
            method="post"
            url="https://apidev.dac.city/auth/login"
            handle-as="json"
            body = "{{login}}"
            handle-as="json"
            content-type="application/json"
            debounce-duration="300">
        </iron-ajax>
        `;
    }

static get is() {
    return 'component-api';
}

static get properties() {
    return {
        loading: {
            type: Boolean,
            reflectToAttribute: true,
            value: false,
        },
        username: {
            type: String,
        },
        login: {
            type: Object,
        },
    };
}

usernameIsAvailable(username) {
    return new Promise((resolve, reject) => {
        this.username = username;
        let apiCall = this.$.checkUsername;
        apiCall.addEventListener('response', (e) => {
            if (e.detail.response.handle === username) {
                resolve(false);
            }
        });
        apiCall.addEventListener('error', (e) => {
            let response = e.detail.request.__data.response;
            if (response.code === 404) {
                resolve(true);
            }
        });
        apiCall.generateRequest();
    });
}
login(publicKey, signature) {
    return new Promise((resolve, reject) => {
        this.login = {};
        this.login.publicKey = publicKey;
        this.login.signature = signature;
        let apiCall = this.$.login;
        apiCall.addEventListener('response', (e) => {
            resolve(e);
        });
        apiCall.addEventListener('error', (e) => {
            resolve(e);
        });
        if (publicKey && signature) {
            apiCall.generateRequest();
        }
    });
}
} customElements.define('component-api', ComponentApi);
