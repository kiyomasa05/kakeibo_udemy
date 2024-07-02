import { createContext, ReactNode, useContext, useState } from "react";
import { Transaction } from "../types";
import { useMediaQuery, useTheme } from "@mui/material";
import { Schema } from "../validations/schema";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { isFireStoreError } from "../utils/errorHandling";

interface AppContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  onDeleteTransaction: (
    transactionIds: string | readonly string[]
  ) => Promise<void>;
  onUpdateTransaction: (
    transaction: Schema,
    transactionId: string
  ) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  // 取引データを格納するstate
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // 取引を保存する処理
  const onSaveTransaction = async (transaction: Schema) => {
    try {
      const docRef = await addDoc(collection(db, "Transactions"), transaction);

      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      setTransactions((prevTransaction) => [
        ...prevTransaction,
        newTransaction,
      ]);
    } catch (e) {
      if (isFireStoreError(e)) {
        console.error(e);
        console.error("firebaseのエラーは", e.message);
        console.error("firebaseのエラーは", e.code);
      } else {
        console.error("一般的なエラーは:", e);
      }
    }
  };

  // 取引を削除する処理
  const onDeleteTransaction = async (
    transactionIds: string | readonly string[]
  ) => {
    try {
      // 引数が配列であればtrueを返し、falseであれば配列にする
      const idsToDelete = Array.isArray(transactionIds)
        ? transactionIds
        : [transactionIds];

      for (const id of idsToDelete) {
        // firestoreのデータ削除
        // doc https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ja
        await deleteDoc(doc(db, "Transactions", id));
      }

      const filteredTransactions = transactions.filter(
        // 取引データに削除した取引が含まれないものを返す
        (transaction) => !idsToDelete.includes(transaction.id)
      );
      setTransactions(filteredTransactions);
    } catch (e) {
      if (isFireStoreError(e)) {
        console.error(e);
        console.error("firebaseのエラーは", e.message);
        console.error("firebaseのエラーは", e.code);
      } else {
        console.error("一般的なエラーは:", e);
      }
    }
  };

  // 取引を更新する処理
  const onUpdateTransaction = async (
    transaction: Schema,
    transactionId: string
  ) => {
    try {
      // firestore更新処理
      const docRef = doc(db, "Transactions", transactionId);

      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, transaction);
      // フロント更新 各取引データを展開し、idと引数で受け取った取引idが一致していれば、一致した取引データを更新する
      const upDateTransactions = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction } : t
      ) as Transaction[];
      setTransactions(upDateTransactions);
    } catch (e) {
      if (isFireStoreError(e)) {
        console.error(e);
        console.error("firebaseのエラーは", e.message);
        console.error("firebaseのエラーは", e.code);
      } else {
        console.error("一般的なエラーは:", e);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        currentMonth,
        setCurrentMonth,
        isLoading,
        setIsLoading,
        isMobile,
        onSaveTransaction,
        onDeleteTransaction,
        onUpdateTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// AppContextを利用する用の関数
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    // contextがundefinedの場合の処理
    throw new Error("グローバルなデータはプロバイダーの中で取得してください");
  }
  return context;
};
