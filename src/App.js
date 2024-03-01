import React, { useEffect, useState } from "react";
import "./index.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./container";
import { auth, db } from "./config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { Spinner } from "./components";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred?.providerData[0].email);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            //dispatch the action to store
            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/home/projects", { replace: true });
          }
        );
      } else {
        navigate("/home/auth", { replace: true });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
    // clean up the listener event
    return () => unsubscribe();
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          className="w-screen h-screen flex items-center justify-center
        overflow-hidden"
        >
          <Spinner />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />}></Route>
            {/* if the route not matching */}
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
