import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../imports/import-ecc.js';

class ComponentEcc extends PolymerElement { 
  
  static get is() { 
    return 'component-ecc'; 
  }


  /**
    @throws {Error|TypeError} - "No Private Key Returned"
    @throws {Error|TypeError} - "Invalid Key Returned"
    @return {object}
    @property {string} privateKey - Private Key
    @property {string} publicKey - Public Key
*/
  makeKeyPair(){
      return new Promise((resolve, reject) => {
        const ecc = eosjs_ecc
        ecc.randomKey()
        .then(privateKey =>  {
          if(!privateKey){
            reject(Error('No private key returned'))
          } else {
            let publicKey = ecc.privateToPublic(privateKey);
            if(ecc.isValidPublic(publicKey) && ecc.isValidPrivate(privateKey)){
              resolve({publicKey: publicKey, privateKey: privateKey})
            } else {
              reject(Error('Invalid key returned'))
            }
          }
        })
        .catch(error => {
          reject(Error(error));
        })
      })
  }

sign(message, privateKey){
  return new Promise((resolve, reject) => {
    const ecc = eosjs_ecc
    if(message && privateKey && ecc.isValidPrivate(privateKey)){
      ecc.sign(message, privateKey)
      .then(signature =>  {
        if(!signature){
          reject(Error('No hex signaure returned'));
        } else {
          resolve(signature);
        }
      })
      .catch(error => {
        reject(Error(error));
      })
    } else {
      reject(Error('Missing or incorect arguments'));
    }
  })
}
  
verify(signature, message, publicKey){
  return new Promise((resolve, reject) => {
    const ecc = eosjs_ecc
    if(signature && message && publicKey && ecc.isValidPublic(publicKey)){
      ecc.verify(signature, message, publicKey)
      .then(verified =>  {
        if(verified === true){
          resolve({status: 'verified', publicKey: publicKey});
        } else {
          ecc.recover(signature, message)
          .then(publicKey =>  {
            reject({status: 'error', publicKey: publicKey});
          })
          .catch(error => {
            reject(Error(error));
          })
        }
      })
      .catch(error => {
        reject(Error(error));
      })
    }
  })
}





} customElements.define('component-ecc', ComponentEcc);