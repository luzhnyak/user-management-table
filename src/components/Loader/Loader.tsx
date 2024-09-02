import { Hourglass } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{ margin: "100px auto" }}
        wrapperClass=""
        colors={["#7d7f81", "#b1b1b1"]}
      />
    </div>
  );
};

export default Loader;
