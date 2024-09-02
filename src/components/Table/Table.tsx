import { useSelector } from "react-redux";
import css from "./Table.module.css";
import {
  selectAllUsers,
  selectFilters,
  selectSort,
} from "../../redux/users/selectors";
import { useEffect, useState } from "react";

import { IUser } from "../../types";
import ColumnHeader from "../ColumnHeader/ColumnHeader";

const Table = () => {
  const users = useSelector(selectAllUsers);
  const filters = useSelector(selectFilters);
  const sort = useSelector(selectSort);

  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);
  const [displayedUsers, setDisplayedUsers] = useState<IUser[]>([]);

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
    if (sort.asc) {
      setDisplayedUsers(
        [...filteredUsers].sort((a, b) => {
          return a[sort.name].toString().localeCompare(b[sort.name].toString());
        })
      );
    } else {
      setDisplayedUsers(
        [...filteredUsers].sort((a, b) => {
          return b[sort.name].toString().localeCompare(a[sort.name].toString());
        })
      );
    }
  }, [sort, filteredUsers]);

  return (
    <div className={css.wrapper}>
      <table className={css.table} cellPadding={0} cellSpacing={0}>
        <thead>
          <tr className={css.row}>
            <th className={css.cell}>
              <ColumnHeader columnName="name" />
            </th>
            <th className={css.cell}>
              <ColumnHeader columnName="username" />
            </th>
            <th className={css.cell}>
              <ColumnHeader columnName="email" />
            </th>
            <th className={css.cell}>
              <ColumnHeader columnName="phone" />
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map(({ id, name, username, email, phone }) => {
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
