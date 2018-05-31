import { PolymerElement, html } from "../../../node_modules/@polymer/polymer/polymer-element.js";
import "../../../node_modules/@polymer/iron-ajax/iron-ajax.js";

class ComponentApi extends PolymerElement {
  static get template() {
    return html`
        <iron-ajax
            id="checkUsername"
            url="https://apidev.dac.city/users/{{username}}"
            handle-as="json"
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
        value: false
      },
      username: {
        type: String
      }
    };
  }
  /**
    @throws {Error|TypeError} - "Username has been used"
    @return {boolean}
    @property {string} username - The username to check
  */


  usernameIsAvailable(username) {
    return new Promise((resolve, reject) => {
      this.username = username;
      let apiCall = this.$.checkUsername;
      apiCall.addEventListener('response', e => {
        if (e.detail.response.handle === username) {
          console.log('Not Available');
          resolve(false);
        }
      });
      apiCall.addEventListener('error', e => {
        let response = e.detail.request.__data.response;

        if (response.code === 404) {
          console.log('Available');
          resolve(true);
        }
      });
      apiCall.generateRequest();
    });
  }

}

customElements.define('component-api', ComponentApi);