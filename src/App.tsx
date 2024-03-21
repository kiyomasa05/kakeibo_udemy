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
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  // firestoreエラーかどうか判定する型ガード
  function isFireStoreError(
    error: unknown
  ): error is { code: string; message: string }{
    return typeof error ==="object" && error !==null && "code" in error
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
          console.error(e)
          console.error("firebaseのエラーは",e.message)
          console.error("firebaseのエラーは",e.code)
        } else {
          console.error("一般的なエラーは:" ,e)
        }
      }
    };
    fecheTransactions();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />}></Route>
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
