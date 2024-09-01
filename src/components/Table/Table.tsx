import { useDispatch, useSelector } from "react-redux";
import css from "./Table.module.css";
import { selectAllUsers, selectFilters } from "../../redux/users/selectors";
import { useEffect, useState } from "react";
import { setFilters } from "../../redux/users/slice";
import { AppDispatch } from "../../redux/stote";
import { IUser } from "../../types";

const Table = () => {
  const users = useSelector(selectAllUsers);
  const filters = useSelector(selectFilters);
  const [asc, setAsc] = useState<boolean>(true);
  const [sort, setSort] = useState<keyof IUser>("id");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);
  const [displaedUsers, setDisplayedUsers] = useState<IUser[]>(filteredUsers);

  const ascSymbol = asc ? "△" : "▽";
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setFilteredUsers(
      users.filter((user: IUser) => {
        return (
          user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
          user.username
            .toLowerCase()
            .includes(filters.username.toLowerCase()) &&
          user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
          user.phone.toLowerCase().includes(filters.phone.toLowerCase())
        );
      })
    );
  }, [filters, users]);

  useEffect(() => {
    let sortData;

    if (!sort) {
      setDisplayedUsers(filteredUsers);
      return;
    }

    if (asc) {
      sortData = filteredUsers.sort((a, b) => {
        return a[sort].toString().localeCompare(b[sort].toString());
      });
    } else {
      sortData = filteredUsers.sort((a, b) => {
        return b[sort].toString().localeCompare(a[sort].toString());
      });
    }

    setDisplayedUsers(sortData);
  }, [sort, asc, filteredUsers]);

  return (
    <div className={css.wrapper}>
      <table className={css.table} cellPadding={0} cellSpacing={0}>
        <thead>
          <tr className={css.row}>
            <th className={css.cell}>
              <button
                className={css.btnSort}
                onClick={() => {
                  setAsc(!asc);
                  setSort("name");
                }}
              >
                Name
                {sort === "name" && <span className="">{ascSymbol}</span>}
              </button>
              <input
                type="text"
                className={css.inputFilter}
                id="name"
                name="name"
                placeholder=""
                value={filters.name}
                onChange={(event) => {
                  dispatch(
                    setFilters({ ...filters, name: event.target.value })
                  );
                }}
              />
            </th>
            <th className={css.cell}>
              <button
                className={css.btnSort}
                onClick={() => {
                  setAsc(!asc);
                  setSort("username");
                }}
              >
                Username
                {sort === "username" && <span className="">{ascSymbol}</span>}
              </button>
              <input
                type="text"
                className={css.inputFilter}
                id="username"
                name="username"
                placeholder=""
                value={filters.username}
                onChange={(event) => {
                  dispatch(
                    setFilters({ ...filters, username: event.target.value })
                  );
                }}
              />
            </th>
            <th className={css.cell}>
              <button
                className={css.btnSort}
                onClick={() => {
                  setAsc(!asc);
                  setSort("email");
                }}
              >
                Email
                {sort === "email" && <span className="">{ascSymbol}</span>}
              </button>
              <input
                type="text"
                className={css.inputFilter}
                id="email"
                name="email"
                placeholder=""
                value={filters.email}
                onChange={(event) => {
                  dispatch(
                    setFilters({ ...filters, email: event.target.value })
                  );
                }}
              />
            </th>
            <th className={css.cell}>
              <button
                className={css.btnSort}
                onClick={() => {
                  setAsc(!asc);
                  setSort("phone");
                }}
              >
                Phone
                {sort === "phone" && <span className="">{ascSymbol}</span>}
              </button>
              <input
                type="text"
                className={css.inputFilter}
                id="phone"
                name="phone"
                placeholder=""
                value={filters.phone}
                onChange={(event) => {
                  dispatch(
                    setFilters({ ...filters, phone: event.target.value })
                  );
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {displaedUsers.map(({ id, name, username, email, phone }) => {
            return (
              <tr key={id} className={css.row}>
                <td className={css.cell}>{name}</td>
                <td className={css.cell}>{username}</td>
                <td className={css.cell}>{email}</td>
                <td className={css.cell}>{phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
