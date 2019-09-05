import {Server} from 'stellar-sdk';

class Stellar{
  // static server = new Server('https://horizon-testnet.stellar.org');
  static server = new Server('https://horizon.stellar.org');

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

  static async loadOperationsForAccount(accountId){
    try{ 
      const operations = await this.server.operations()
      .forAccount(accountId).order("desc").limit(20).call();
      return operations;
    } catch (e) {
      console.log("An error ocurred trying to load operations."); 
      console.log(e);     
    }
  }

  static async getTransactionByHash(transactionHash){
    try{
      const transaction = await this.server.transactions().transaction(transactionHash).call();
      return transaction;
    } catch (e) {
      console.log("An error ocurred trying to load transaction by hash.");
      console.log(e)
    }
  }
}
export default Stellar;