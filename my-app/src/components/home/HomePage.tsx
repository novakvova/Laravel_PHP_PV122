import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { APP_ENV } from "../../env";
import http from "../../http";
import { AuthUserActionType } from "../auth/types";
import { ICategoryResponse, ICategorySearch } from "./types";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("page = ", searchParams.get("page"));

  const [search, setSearch] = useState<ICategorySearch>({
    page: searchParams.get("page") || 1,
  });

  const [category, setCategory] = useState<ICategoryResponse>({
    data: [],
    total: 0,
    current_page: 0,
    last_page: 0,
  });

  useEffect(() => {
    http
      .get<ICategoryResponse>(`api/category`, {
        params: search,
      })
      .then((resp) => {
        //setList(resp.data.data);
        setCategory(resp.data);
      })
      .catch((bad) => {
        console.log("Bad request", bad);
      });
  }, [search]);

  const { data, last_page, current_page, total } = category;
  const buttons = [];
  for (let i = 1; i <= last_page; i++) {
    buttons.push(i);
  }

  const pagination = buttons.map((page) => (
    <li
      key={page}
      className={classNames("page-item", { active: page === current_page })}
    >
      <Link
        className="page-link"
        to={"?page=" + page}
        onClick={() => setSearch({ ...search, page })}
      >
        {page}
      </Link>
    </li>
  ));

  const dataView = data.map((category) => (
    <tr key={category.id}>
      <th>
        <img
          src={`${APP_ENV.BASE_URL}uploads/50_${category.image}`}
          alt="Фотка"
          width={50}
        />
      </th>
      <td>{category.name}</td>
      <td>{category.description}</td>
    </tr>
  ));
  const dispatch = useDispatch();

  const loginUser = () => {
    console.log("Вхід у систему");
    dispatch({ type: AuthUserActionType.LOGIN_USER });
  };

  const logoutUser = () => {
    console.log("Вийти із системи");
    dispatch({ type: AuthUserActionType.LOGOUT_USER });
  };

  return (
    <>
      <h1 className="text-center">Список категорій</h1>
      <button className="btn btn-primary" onClick={loginUser}>
        Вхід
      </button>
      <button className="btn btn-danger" onClick={logoutUser}>
        Вихід
      </button>
      <Link className="btn btn-success" to="/categories/create">
        Додати
      </Link>
      <h4>Усього записів: {total}</h4>
      {data.length === 0 ? (
        <h2>Дані відсутні</h2>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Фото</th>
                <th scope="col">Назва</th>
                <th scope="col">Опис</th>
              </tr>
            </thead>
            <tbody>{dataView}</tbody>
          </table>
          <ul className="pagination justify-content-center">{pagination}</ul>
        </>
      )}
    </>
  );
};

export default HomePage;
