class Encryption{
  // Generate key from password
  static genEncryptionKey = async (password, mode, length) => {
    var algo = {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: new TextEncoder().encode('a-unique-salt'),
      iterations: 1000
    };
    var derived = { name: mode, length: length };
    var encoded = new TextEncoder().encode(password);
    var key = await crypto.subtle.importKey('raw', encoded, { name: 'PBKDF2' }, false, ['deriveKey']);

    return crypto.subtle.deriveKey(algo, key, derived, false, ['encrypt', 'decrypt']);
  }

  // Encrypt function
  static encrypt = async (text, password, mode, length, ivLength) => {
    var algo = {
      name: mode,
      length: length,
      iv: crypto.getRandomValues(new Uint8Array(ivLength))
    };
    var key = await this.genEncryptionKey(password, mode, length);
    var encoded = new TextEncoder().encode(text);

    return {
        cipherText: await crypto.subtle.encrypt(algo, key, encoded),
        iv: algo.iv
    };
  }

  static decrypt = async (encrypted, password, mode, length) => {
    var algo = {
      name: mode,
      length: length,
      iv: encrypted.iv
    };
    var key = await this.genEncryptionKey(password, mode, length);
    var decrypted = await crypto.subtle.decrypt(algo, key, encrypted.cipherText);
    return new TextDecoder().decode(decrypted);
  }


  static encryptText = async (text, pass) => {
    try{
      let encryptedValue = await this.encrypt(text, pass, 'AES-GCM', 256, 12)
      return encryptedValue 
    } catch (error) {
      throw error
    }
  }

  static decryptText = async (encryptedValue, pass) => {
    try{
      let decryptedValue = await this.decrypt(encryptedValue, pass, 'AES-GCM', 256)
      console.log(decryptedValue)
    } catch (error) {
      throw error
    }
  }
}

export default Encryption