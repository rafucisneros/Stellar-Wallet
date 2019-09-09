import {Server} from 'stellar-sdk';

class Stellar{

  static OPERATIONS_TYPES = ["Create_Account",
    "Payment", "Path_Payment", "Manage_Buy_Offer",
    "Manage_Sell_Offer", "Create_Passive_Sell_Offer",
    "Set_Options", "Change_Trust", "Allow_Trust", 
    "Account_Merge", "Inflation", "Manage_Data",
    "Bump_Sequence"]
  static server = new Server('https://horizon-testnet.stellar.org');
  // static server = new Server('https://horizon.stellar.org');

  static async getAccount(accountId){
    try{
      const account = await this.server.accounts()
        .accountId(accountId).call();
      return account;
    } catch (e) {
      console.log("An error ocurred trying to load account.");
      console.log(e);      
    }
  }

  static async getOperationsForAccount(accountId){
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

  static async accountExists(accountKey){
    result = await this.server.accounts()
      .accountId(accountKey).call()
      .then(()=>{return true;}).catch((error)=>{
        return error});
    return result;
  }
}

export default Stellar;