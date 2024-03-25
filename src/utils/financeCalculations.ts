import { Balance, Transaction } from "../types";

export function financeCalculations(transactions: Transaction[]): Balance {
  //developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type == "income") {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      acc.balance += acc.income - acc.expense;

      return acc
    },
    {
      income: 0,
      expense: 0,
      balance: 0,
    }
  );
}
