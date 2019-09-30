import {
  Server, Keypair, Operation, TransactionBuilder,
  Asset, Networks, Memo
} from 'stellar-sdk';

class Stellar{

  static OPERATIONS_TYPES = ["Create_Account",
    "Payment", "Path_Payment", "Manage_Buy_Offer",
    "Manage_Sell_Offer", "Create_Passive_Sell_Offer",
    "Set_Options", "Change_Trust", "Allow_Trust", 
    "Account_Merge", "Inflation", "Manage_Data",
    "Bump_Sequence"]
  static server = new Server('https://horizon-testnet.stellar.org')
  // static server = new Server('https://horizon.stellar.org')

  static async getAccount(accountId){
    try{
      const account = await this.server.accounts()
        .accountId(accountId).call()
      return account
    } catch (error) {
      console.log("An error ocurred trying to load account.")
      console.log(error)  
      throw error  
    }
  }

  static async getOperationsForAccount(accountId){
    try{ 
      const operations = await this.server.operations()
      .forAccount(accountId).order("desc").limit(20).call()
      return operations
    } catch (error) {
      console.log("An error ocurred trying to load operations.")
      console.log(error) 
      throw error 
    }
  }

  static async accountExists(accountKey){
    try{
      result = await this.server.accounts()
               .accountId(accountKey).call()
      return true
    } catch (error){
      console.log("An error ocurred trying to check destination account existence.");
      console.log(error)
      throw error
    }
  }

  static async getBaseFee(){
    try {
      let { p90_accepted_fee: fee } = await this.server.feeStats()
      return fee
    } catch(error){
      console.log("An error ocurred trying to load base fee. Using 100 troops as fee.")
      console.log(error)
      return 100
    }     
  }

  static async submitTransaction(source, destination, amount, asset, fee, secretSeed, memo){
    try{
      const account = await this.server.loadAccount(source)
      const asset = Asset.native()
      if (memo){
        var transaction = new TransactionBuilder(account, { 
          fee, 
          networkPassphrase: Networks.TESTNET,
          timebounds: await this.server.fetchTimebounds(600)
        })
        .addOperation(
          // this operation funds the new account with XLM
          Operation.payment({
            destination: destination,
            asset: asset,
            amount: amount
          })
        ).addMemo(new Memo.text(memo)).build()
      } else {
        var transaction = new TransactionBuilder(account, { 
          fee, 
          networkPassphrase: Networks.TESTNET,
          timebounds: await this.server.fetchTimebounds(600)
        })
        .addOperation(
          // this operation funds the new account with XLM
          Operation.payment({
              destination: destination,
              asset: asset,
              amount: amount
          })
        ).build()
      }
      transaction.sign(Keypair.fromSecret(secretSeed))
      const transactionResult = await this.server.submitTransaction(transaction)
      return transactionResult
    } catch (error){
      console.log("An error ocurred trying to submit the transaction.")
      console.log(error)
      console.error(error.response.data.detail);
      console.error(error.response.data.extras.result_codes);
      console.error(error.response.data.type);
      throw error
    }
  }

  static generateSeed(){
    return Keypair.random()
  }
}

export default Stellar