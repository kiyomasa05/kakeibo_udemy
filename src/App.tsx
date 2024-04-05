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
} from "firebase/firestore";
import { db } from "./firebase";
import { formatMonth } from "./utils/formatting";
import { Schema } from "./validations/schema";

function App() {
  // firestoreエラーかどうか判定する型ガード
  function isFireStoreError(
    error: unknown
  ): error is { code: string; message: string } {
    return typeof error === "object" && error !== null && "code" in error;
  }
  // 取引データを格納するstate
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 後にtanstack queryでやってみよう
  useEffect(() => {
    const fecheTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(), //スプレット構文でデータを展開する
            id: doc.id,
          } as Transaction;
        });
        setTransactions(transactionData);
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
    fecheTransactions();
  }, []);
  // transactionsから今月の取引データのみ取得
  // format=date-fnsのフォーマット
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  // 取引を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
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
  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      // firestoreのデータ削除
      // doc https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ja
      await deleteDoc(doc(db, "Transactions", transactionId));
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              }
            ></Route>
            <Route path="/report" element={<Report />}></Route>
            {/* 何にもマッチしなかった場合 */}
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
