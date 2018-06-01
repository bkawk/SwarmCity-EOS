import { PolymerElement } from "../../../node_modules/@polymer/polymer/polymer-element.js";
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


  makeKeyPair() {
    return new Promise((resolve, reject) => {
      const ecc = eosjs_ecc;
      ecc.randomKey().then(privateKey => {
        if (!privateKey) {
          reject(Error('No private key returned'));
        } else {
          let publicKey = ecc.privateToPublic(privateKey);

          if (ecc.isValidPublic(publicKey) && ecc.isValidPrivate(privateKey)) {
            resolve({
              status: 200,
              publicKey: publicKey,
              privateKey: privateKey
            });
          } else {
            reject(Error('Invalid key returned'));
          }
        }
      }).catch(error => {
        reject(Error(error));
      });
    });
  }

  sign(message, privateKey, publicKey) {
    return new Promise((resolve, reject) => {
      const ecc = eosjs_ecc;

      if (message && privateKey && ecc.isValidPrivate(privateKey)) {
        const signature = ecc.sign(message, privateKey);
        resolve({
          signature,
          privateKey,
          publicKey
        });
      } else {
        reject(Error('Missing or incorect arguments'));
      }
    });
  }

  verify(signature, message, publicKey) {
    return new Promise((resolve, reject) => {
      const ecc = eosjs_ecc;

      if (signature && message && publicKey && ecc.isValidPublic(publicKey)) {
        ecc.verify(signature, message, publicKey).then(verified => {
          if (verified === true) {
            resolve({
              status: 200,
              publicKey: publicKey
            });
          } else {
            ecc.recover(signature, message).then(publicKey => {
              resolve({
                status: 400,
                publicKey: publicKey
              });
            }).catch(error => {
              reject(Error(error));
            });
          }
        }).catch(error => {
          reject(Error(error));
        });
      } else {
        reject(Error('Missing or incorect arguments'));
      }
    });
  }

  sha256(message) {
    return new Promise((resolve, reject) => {
      const ecc = eosjs_ecc;

      if (message) {
        ecc.sha256(message, 'hex').then(sha256Hash => {
          resolve({
            status: 200,
            sha256Hash: sha256Hash
          });
        }).catch(error => {
          reject(Error(error));
        });
      } else {
        reject(Error('Missing or incorect arguments'));
      }
    });
  }
  /**
  * create a utc Keystore
  * @return {utcKeyStore} utcKeyStore
  * @argument {String} privateKey
  * @argument {String} hexAddress
  * @argument {String} password
  */


  utcKeystore(privateKey, hexAddress, password) {
    return new Promise((resolve, reject) => {
      const id = webpack.uuid.v4({
        random: webpack.randomBytes(16)
      });
      const salt = webpack.randomBytes(32);
      const iv = webpack.randomBytes(16);
      const Buffer = webpack.Buffer.Buffer;
      const key = webpack.scrypt(new Buffer(password), salt, 1024, 8, 1, 32);
      const cipher = webpack.createCipheriv('aes-128-ctr', key.slice(0, 16), iv);
      const ciphertext = Buffer.concat([cipher.update(privateKey), cipher.final()]);
      const mac = webpack.sha3(Buffer.concat([key.slice(16, 32), new Buffer(ciphertext, 'hex')]));
      resolve({
        fileName: ['UTC--', new Date().toJSON().replace(/:/g, '-'), '--', hexAddress].join(''),
        address: hexAddress,
        privateKey: privateKey.toString('hex'),
        utcKeystore: {
          version: 3,
          id: id,
          address: hexAddress,
          Crypto: {
            ciphertext: ciphertext.toString('hex'),
            cipherparams: {
              iv: iv.toString('hex')
            },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
              'dklen': 32,
              'salt': salt.toString('hex'),
              'n': 1024,
              'r': 8,
              'p': 1
            },
            mac: mac.toString('hex')
          }
        }
      });
    });
  }
  /**
  * decrypt utc keystore
  * @return {privateKey} privateKey
  * @argument {String} utcKeystore
  * @argument {String} password
  */


  decryptUtcKeystore(utcKeystore, password) {
    return new Promise((resolve, reject) => {
      const Buffer = webpack.Buffer.Buffer;
      const kdfparams = utcKeystore.Crypto.kdfparams;
      let key;

      if (utcKeystore.Crypto.kdf === 'scrypt') {
        key = webpack.scrypt(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
      } else if (utcKeystore.Crypto.kdf === 'pbkdf2') {
        if (kdfparams.prf !== 'hmac-sha256') {
          reject(Error('hmac-sha256 is not supported'));
        }

        key = pbkdf2Sync(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256');
      } else {
        reject(Error('Unsupported key derivation scheme'));
      }

      const ciphertext = new Buffer(utcKeystore.Crypto.ciphertext, 'hex');
      const mac = webpack.sha3(Buffer.concat([key.slice(16, 32), ciphertext]));

      if (mac.toString('hex') !== utcKeystore.Crypto.mac) {
        reject(Error('Wrong Password'));
      }

      const decipher = webpack.createDecipheriv(utcKeystore.Crypto.cipher, key.slice(0, 16), new Buffer(utcKeystore.Crypto.cipherparams.iv, 'hex'));
      resolve(Buffer.concat([decipher.update(ciphertext), decipher.final()]));
    });
  }

}

customElements.define('component-ecc', ComponentEcc);