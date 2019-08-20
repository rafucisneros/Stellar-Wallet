import {Server} from 'stellar-sdk';

class Stellar{
  constructor(){
    this.server = new Server('https://horizon-testnet.stellar.org');
  }

  async loadAccount(accoundId, context){
    try{
      const account = await this.server.accounts()
        .accountId(accoundId).call();
      console.log(account);
      context.setState({account: account})
      return account;
    } catch {
      console.log("An error ocurred trying to load account.");      
    }
  }

  async loadTransactionsForAccount(accoundId, context){
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