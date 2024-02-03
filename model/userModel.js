const pool = require('../config/database');

class TransferModel {

    static async getAllAccounts() {
        try {
          const result = await 
          pool.query('SELECT id, account_number, balance FROM accounts');
          return result.rows;
        } catch (error) {
          throw error;
        }
      }

    static async getMyAccount(id) {
        try {
          const result = await 
          pool.query('SELECT id, account_number, balance FROM accounts WHERE account_number = $1', [id]);
          return result.rows[0];
        } catch (error) {
          throw error;
        }
      }

  static async checkBalance(accountNumber) {
    try {
      const result = await 
      pool.query('SELECT balance FROM accounts WHERE account_number = $1', [accountNumber]);
      return result.rows.length > 0 ?  result.rows[0].balance : new Error('Account not found');


    } catch (error) {
      throw error;
    }
  }

  static async addAccount(accountNumber, initialBalance) {
    try {
      const result = await pool.query('INSERT INTO accounts (account_number, balance) VALUES ($1, $2) RETURNING *',
       [accountNumber, initialBalance]);
       return result.rows[0];
    } catch (error) {
         // Check if the error is a unique violation error
    if (error.code === '23505' && error.constraint === 'accounts_account_number_key') {
        throw new Error('Account number is already in use.');
      }
      throw error;
    }
  }

  static async updateBalance(accountNumber, newBalance) {
    try {
    const result = await pool.query('UPDATE accounts SET balance = $1 WHERE account_number = $2', 
      [newBalance, accountNumber]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  static async updateAcc(oldAccNumber, newAccountNumber) {
    try {
    const result = await 
     pool.query('UPDATE accounts SET account_number = $2 WHERE account_number = $1 RETURNING *', 
      [oldAccNumber, newAccountNumber]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  static async deleteAcc(accNumber) {
    try {
     await pool.query('DELETE FROM accounts WHERE account_number = $1', 
      [accNumber]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TransferModel;
