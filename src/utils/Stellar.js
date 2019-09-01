import {Server} from 'stellar-sdk';

class Stellar{
  static server = new Server('https://horizon-testnet.stellar.org');

  static async loadAccount(accountId){
    try{
      const account = await this.server.accounts()
        .accountId(accountId).call();
      return account;
    } catch (e) {
      console.log("An error ocurred trying to load account.");
      console.log(e);      
    }
  }

  static async loadTransactionsForAccount(accountId){
    try{
      const transactions = await this.server.transactions()
        .forAccount(accountId).call();
      return transactions;
    } catch (e) {
      console.log("An error ocurred trying to load transactions."); 
      console.log(e);     
    }
  }
}
export default Stellar;