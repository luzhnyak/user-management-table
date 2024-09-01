import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Table from "./components/Table/Table";
import { AppDispatch } from "./redux/stote";
import { getAllUsersThunk } from "./redux/users/operations";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  return (
    <div className="container">
      <Table />
    </div>
  );
}

export default App;
