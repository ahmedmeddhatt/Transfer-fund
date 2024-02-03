const TransferModel = require('../model/userModel');

exports.getAllAcc =async (req, res) => {
    try {
        const accounts = await TransferModel.getAllAccounts();
        if(!accounts){
            res.status(404).json({
                message: "Data not found!"
            }); 
        };
        res.status(200).json({
            message: "Data retrieved successfully",
            length: accounts.length,
            data: accounts
        });
    } catch (error) {
        console.error('Error retrieving all the accounts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};
exports.getMyAcc =async (req, res) => {
    const myAccount = req.params.acc;
    try {
        const myacc = await TransferModel.getMyAccount(myAccount);

        if(!myacc){
            res.status(404).json({
                message: "Account not found!"
            }); 
        }else {
            res.status(200).json({
                message: "Data retrieved successfully",
                data: myacc
            });
        };

    } catch (error) {
        console.error('Error retrieving your account:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};
exports.checkBalance =async (req, res) => {
    const myAccount = req.params.acc;
    try {
        const myBalance = await TransferModel.checkBalance(myAccount);
        if(!myBalance){
            res.status(404).json({
                message: "Account not found!"
            }); 
        };
        const remainingBalance = {
            'Current Balance': myBalance
        };
        res.status(200).json({
            message: "Data retrieved successfully",
            data: remainingBalance
        });
    } catch (error) {
        console.error('Error retrieving account balance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};
exports.addAccount =async (req, res) => {
    const { accountNumber, initialBalance} = req.body;

    if (!accountNumber || !initialBalance) {
        console.log(accountNumber, initialBalance);
        return res.status(404).
        json({ 
            status: 'fail',
            error: 'Kindly add an account number & initial balance!' });
      } else if (initialBalance < 100) {
        return res.status(400).
        json({ 
            status: 'fail',
            error: 'Minimun initial balance is 100 EGP!' });
      };


  try {
    // Verify that the source account has enough funds
    const newAccount = await TransferModel.addAccount(accountNumber, initialBalance);

    res.status(200)
    .json({ 
        message: 'Accound has created successfully',
        data: newAccount
    });

} catch (error) {
    console.error('Error during adding an account:', error);

    if (error.message === 'Account number is already in use.') {
      return res.status(409).json({
        status: 'fail',
        error: 'Account number is already in use.',
      });
    } else {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  };

};
exports.addFund = async (req, res) => {
    const { sourceAccount, destinationAccount, amount } = req.body;
    console.log(sourceAccount, destinationAccount, amount);
    if (!sourceAccount) {
        return res.status(404).
        json({ 
            status: 'fail',
            error: 'Your account number is incorrect!' 
        });
      } else if (!destinationAccount) {
        return res.status(404).
        json({ 
            status: 'fail',
            error: 'Destination account number is incorrect!'
        });
      } else if (amount < 1) {
        return res.status(400).
        json({ 
            status: 'fail',
            error: 'Please add a valid amount!'
        });
      };

  try {

    const sourceAcc = await TransferModel.getMyAccount(sourceAccount);

    if(!sourceAcc){
        res.status(404).json({
            message: "Source account not found!"
        }); 
    } else {

 

    // Verify that the source account has enough funds
    const sourceBalance = await TransferModel.checkBalance(sourceAccount);
    console.log('sourceBalance before transaction ', sourceBalance);

    if (sourceBalance < amount) {
        return res.status(400).
        json({ error: 'Insufficient funds in the source account' });
      };

    // Deduct the transferred amount from the source account
    await TransferModel.updateBalance(sourceAccount, sourceBalance - amount);

    const destinationAcc = await TransferModel.getMyAccount(destinationAccount);

    if(!destinationAcc){
        res.status(404).json({
            message: "Destination account not found!"
        }); 
    } else {

   
    // Add the transferred amount to the destination account
    const destinationBalance = await TransferModel.checkBalance(destinationAccount);
    console.log('destinationBalance before transaction ', destinationBalance);

    await TransferModel.updateBalance(destinationAccount, destinationBalance - amount);
    console.log('destinationBalance after transaction ', destinationBalance);

    // Display the source account balance after transaction
    const updatedSourceBalance = await TransferModel.checkBalance(sourceAccount);
    console.log('updatedSourceBalance after transaction ', updatedSourceBalance);

    const remainingBalance = {
        'Remaining Balance': updatedSourceBalance
    };

    res.status(200)
    .json({ 
        message: 'Money has transferred successfully',
        data: remainingBalance
    });
  };
};
  } catch (error) {
    console.error('Error during fund transfer:', error);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }

};
  exports.updateAcc =async (req, res) => {
    const myAccount = req.params.acc;
    const {newAccount} = req.body;
    try {

        const myAcc = await TransferModel.getMyAccount(myAccount);

        if(!myAcc){
            res.status(404).json({
                message: "Account not found!"
            }); 
        } else {
            const updatedAcc = await TransferModel.updateAcc(myAccount, newAccount);
            
            res.status(200).json({
                message: "Account was updated successfully",
                data: updatedAcc
            });
        };
    } catch (error) {
        console.error('Error updating your account:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};
  exports.deleteAcc =async (req, res) => {
    const myAccount = req.params.acc;
    try {

        const myAcc = await TransferModel.getMyAccount(myAccount);

        if(!myAcc){
            res.status(404).json({
                message: "Account not found!"
            }); 
        } else {
            const deletedAcc = await TransferModel.deleteAcc(myAccount);
            
            res.status(200).json({
                message: "Account was deleted successfully",
                data: deletedAcc
            });
        };
    } catch (error) {
        console.error('Error deleting your account:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};