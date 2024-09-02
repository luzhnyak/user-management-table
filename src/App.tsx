import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "./components/Table/Table";
import { AppDispatch } from "./redux/stote";
import { getAllUsersThunk } from "./redux/users/operations";
import { selectError } from "./redux/users/selectors";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Server error");
    }
  }, [error]);

  return (
    <div className="container">
      <Table />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}

export default App;
