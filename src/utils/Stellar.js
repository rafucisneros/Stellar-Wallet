import {Server} from 'stellar-sdk';

class Stellar{
  static server = new Server('https://horizon-testnet.stellar.org');

  static async loadAccount(accoundId, context){
    try{
      const account = await this.server.accounts()
        .accountId(accoundId).call();
      console.log(account);
      context.setState({account: account})
      return account;
    } catch (e) {
      console.log("An error ocurred trying to load account.");
      console.log(e)      
    }
  }

  static async loadTransactionsForAccount(accoundId, context){
    try{
      const transactions = await this.server.transactions()
        .forAccount(accoundId)
        .call();
      // console.log(transactions);
      context.setState({transactions: transactions});
      return transactions;
    } catch {
      console.log("An error ocurred trying to load transactions.");      
    }
  }

}

export default Stellar;