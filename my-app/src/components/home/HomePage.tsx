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

  const [category, setCategory] = useState<ICategoryResponse>({
    data: [],
    total: 0,
    current_page: 0,
    last_page: 0,
  });

  console.log("---info url---", window.location);
  useEffect(() => {
    // read the params on component load and when any changes occur
    const currentParams = Object.fromEntries([...searchParams as any]);
    // get new values on change
    console.log('-------useEffect:', currentParams);
    var find: ICategorySearch = {
      page: currentParams.page || 1,
    };

    http
      .get<ICategoryResponse>(`api/category`, {
        params: find,
      })
      .then((resp) => {
        //setList(resp.data.data);
        setCategory(resp.data);
      })
      .catch((bad) => {
        console.log("Bad request", bad);
      });
  }, [searchParams]);

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
      <td>{category.short_text}</td>
      <td>{category.text}</td>
    </tr>
  ));

  return (
    <>
      <h1 className="text-center">Список категорій</h1>
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
                <th scope="col">Короткий опис</th>
                <th scope="col">Повний опис</th>
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
