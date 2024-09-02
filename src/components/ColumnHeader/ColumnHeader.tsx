import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setFilters, setSort } from "../../redux/users/slice";
import { selectFilters, selectSort } from "../../redux/users/selectors";
import { AppDispatch } from "../../redux/stote";
import { IUser } from "../../types";

import x from "../../images/x.svg";
import css from "./ColumnHeader.module.css";

interface IProps {
  columnName: keyof Omit<IUser, "id">;
}

const ColumnHeader: FC<IProps> = ({ columnName }) => {
  const filters = useSelector(selectFilters);
  const dispatch: AppDispatch = useDispatch();
  const sort = useSelector(selectSort);

  const ascSymbol = sort.asc ? "△" : "▽";

  return (
    <>
      <button
        className={css.btnSort}
        onClick={() => dispatch(setSort({ name: columnName, asc: !sort.asc }))}
      >
        <span className={css.title}>{columnName}</span>
        {sort.name === columnName && (
          <span className={css.ascSymbol}>{ascSymbol}</span>
        )}
      </button>
      <div className={css.inputWrapper}>
        <input
          type="text"
          className={css.inputFilter}
          id={columnName}
          name={columnName}
          value={filters[columnName]}
          onChange={(event) => {
            dispatch(
              setFilters({ ...filters, [columnName]: event.target.value })
            );
          }}
        />
        <button
          className={css.clearInputBtn}
          type="button"
          onClick={() => {
            dispatch(setFilters({ ...filters, [columnName]: "" }));
          }}
        >
          <img src={x} alt="Clear" width={24} height={24} />
        </button>
      </div>
    </>
  );
};

export default ColumnHeader;
