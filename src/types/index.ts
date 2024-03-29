export type TransactionType = "income" | "expense"

export type IncomeCategory = "給与" | "副収入"
export type ExpenseCategory = "食費" | "日用品"|"住居費"|"娯楽"|"医療費"|"子供"|"外食"|"自己投資"|"その他"


export interface Transaction {
  id: string;
  date: string;
  amount: number;
  content: string;
  type: TransactionType;
  category: IncomeCategory | ExpenseCategory;
}

export interface Balance {
  income: number;
  expense: number;
  balance: number;
}
export interface CalenderContent {
  start: string;
  income: string;//1,000のようにカンマ区切りにするため文字列
  expense: string;
  balance: string;
}
