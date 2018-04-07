import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../imports/import-socketio.js';

class ComponentApi extends PolymerElement { 

static get is() { 
    return 'component-api'; 
}

static get properties() {
    return {
        loading: {
            type: Boolean,
            reflectToAttribute: true,
            value: false,
        }
    };
}


  /**
    @throws {Error|TypeError} - "Username has been used"
    @return {boolean}
    @property {string} Username - The username to check

*/
_usernameIsUnique(username){
    return new Promise((resolve, reject) => {
        resolve(true); 
    })
}

} customElements.define('component-api', ComponentApi);