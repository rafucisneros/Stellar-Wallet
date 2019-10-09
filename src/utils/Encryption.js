import {AES, enc} from 'crypto-js'

class Encryption{

  static encryptText = (text, pass) => {
    try {
      let encryptedValue = AES.encrypt(text, pass);
      return encryptedValue.toString() 
    } catch (error) {
      throw error
    }
  }

  static decryptText = (text, pass) => {
    try { 
      let bytes = AES.decrypt(text.toString(), pass);
      let message = bytes.toString(enc.Utf8);
      return message
    } catch (error) {
      throw error
    }
  }
}

export default Encryption