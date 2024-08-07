import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Transaction } from "./types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { formatMonth } from "./utils/formatting";
import { Schema } from "./validations/schema";
import { AppContextProvider } from "./context/AppContext";

function App() {
  // firestoreエラーかどうか判定する型ガード
  // function isFireStoreError(
  //   error: unknown
  // ): error is { code: string; message: string } {
  //   return typeof error === "object" && error !== null && "code" in error;
  // }

  // 取引データを格納するstate
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [isLoading, setIsLoading] = useState(true);



  // 取引を保存する処理
  // const handleSaveTransaction = async (transaction: Schema) => {
  //   try {
  //     const docRef = await addDoc(collection(db, "Transactions"), transaction);

  //     const newTransaction = {
  //       id: docRef.id,
  //       ...transaction,
  //     } as Transaction;
  //     setTransactions((prevTransaction) => [
  //       ...prevTransaction,
  //       newTransaction,
  //     ]);
  //   } catch (e) {
  //     if (isFireStoreError(e)) {
  //       console.error(e);
  //       console.error("firebaseのエラーは", e.message);
  //       console.error("firebaseのエラーは", e.code);
  //     } else {
  //       console.error("一般的なエラーは:", e);
  //     }
  //   }
  // };

  // // 取引を削除する処理
  // const handleDeleteTransaction = async (
  //   transactionIds: string | readonly string[]
  // ) => {
  //   try {
  //     // 引数が配列であればtrueを返し、falseであれば配列にする
  //     const idsToDelete = Array.isArray(transactionIds)
  //       ? transactionIds
  //       : [transactionIds];

  //     for (const id of idsToDelete) {
  //       // firestoreのデータ削除
  //       // doc https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ja
  //       await deleteDoc(doc(db, "Transactions", id));
  //     }

  //     const filteredTransactions = transactions.filter(
  //       // 取引データに削除した取引が含まれないものを返す
  //       (transaction) => !idsToDelete.includes(transaction.id)
  //     );
  //     setTransactions(filteredTransactions);
  //   } catch (e) {
  //     if (isFireStoreError(e)) {
  //       console.error(e);
  //       console.error("firebaseのエラーは", e.message);
  //       console.error("firebaseのエラーは", e.code);
  //     } else {
  //       console.error("一般的なエラーは:", e);
  //     }
  //   }
  // };

  // // 取引を更新する処理
  // const handleUpdateTransaction = async (
  //   transaction: Schema,
  //   transactionId: string
  // ) => {
  //   try {
  //     // firestore更新処理
  //     const docRef = doc(db, "Transactions", transactionId);

  //     // Set the "capital" field of the city 'DC'
  //     await updateDoc(docRef, transaction);
  //     // フロント更新 各取引データを展開し、idと引数で受け取った取引idが一致していれば、一致した取引データを更新する
  //     const upDateTransactions = transactions.map((t) =>
  //       t.id === transactionId ? { ...t, ...transaction } : t
  //     ) as Transaction[];
  //     setTransactions(upDateTransactions);
  //   } catch (e) {
  //     if (isFireStoreError(e)) {
  //       console.error(e);
  //       console.error("firebaseのエラーは", e.message);
  //       console.error("firebaseのエラーは", e.code);
  //     } else {
  //       console.error("一般的なエラーは:", e);
  //     }
  //   }
  // };

  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route
                index
                element={
                  <Home
                    // monthlyTransactions={monthlyTransactions}
                    // setCurrentMonth={setCurrentMonth}
                    // onSaveTransaction={handleSaveTransaction}
                    // onDeleteTransaction={handleDeleteTransaction}
                    // onUpdateTransaction={handleUpdateTransaction}
                  />
                }
              />
              <Route
                path="/report"
                element={
                  <Report
                    // currentMonth={currentMonth}
                    // setCurrentMonth={setCurrentMonth}
                    // monthlyTransactions={monthlyTransactions}
                    // isLoading={isLoading}
                    // onDeleteTransaction={handleDeleteTransaction}
                  />
                }
              />
              {/* 何にもマッチしなかった場合 */}
              <Route path="*" element={<NoMatch />}></Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
