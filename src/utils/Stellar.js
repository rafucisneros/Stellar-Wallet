import {Server} from 'stellar-sdk';

class Stellar{
  static server = new Server('https://horizon-testnet.stellar.org');

  static async loadAccount(accoundId){
    try{
      const account = await this.server.accounts()
        .accountId(accoundId).call();
      // console.log(account);
      return account;
    } catch (e) {
      console.log("An error ocurred trying to load account.");
      console.log(e);      
    }
  }

  static async loadTransactionsForAccount(accoundId){
    try{
      const transactions = await this.server.transactions()
        .forAccount(accoundId)
        .call();
      // console.log(transactions);
      return transactions;
    } catch (e) {
      console.log("An error ocurred trying to load transactions."); 
      console.log(e);     
    }
  }

}

export default Stellar;