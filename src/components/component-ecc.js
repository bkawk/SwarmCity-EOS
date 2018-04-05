import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../imports/import-ecc.js';

class ComponentEcc extends PolymerElement { 
  
  static get is() { 
    return 'component-ecc'; 
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
    @throws {Error|TypeError} - "No Private Key Returned"
    @throws {Error|TypeError} - "Invalid Key Returned"
    @return {object}
    @property {string} privateKey - Private Key
    @property {string} publicKey - Public Key
    @property {Boolean} loading - True if the key is being made, false once made.
*/
  _makeKeyPair(){
      return new Promise((resolve, reject) => {
        this.loading = true;
        const ecc = eosjs_ecc
        ecc.randomKey()
        .then(privateKey =>  {
          if(!privateKey){
            this.loading = false;
            reject(Error('No Private Key Returned'))
          } else {
            let publicKey = ecc.privateToPublic(privateKey);
            this.loading = false;
            if(ecc.isValidPublic(publicKey) && ecc.isValidPrivate(privateKey)){
              resolve({publicKey: publicKey, privateKey: privateKey})
            } else {
              reject(Error('Invalid Key Returned'))
            }
          }
        })
        .catch(error => {
          this.loading = false;
          reject(Error(error));
        })
      })
  }

} customElements.define('component-ecc', ComponentEcc);