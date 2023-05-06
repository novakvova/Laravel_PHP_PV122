import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ICategoryItem, ICategoryResponse, ICategorySearch } from "./types";

const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  console.log("page = ", searchParams.get("page"));
  
  
  const [search, setSearch] = useState<ICategorySearch>({
    page: searchParams.get("page") || 1,
  });

  const [list, setList] = useState<ICategoryItem[]>([]);

  useEffect(() => {
    axios
      .get<ICategoryResponse>("http://127.0.0.1:8000/api/category", {
        params: search,
      })
      .then((resp) => {
        setList(resp.data.data);
      })
      .catch((bad) => {
        console.log("Bad request", bad);
      });
  }, [search]);
  

  const dataView = list.map((category) => (
    <tr key={category.id}>
      <th>
        <img src={category.image} alt="Фотка" width={50} />
      </th>
      <td>{category.name}</td>
      <td>{category.description}</td>
    </tr>
  ));

  return (
    <>
      <h1 className="text-center">Список категорій</h1>
      <Link className="btn btn-success" to="/categories/create">
        Додати
      </Link>
      {list.length === 0 ? (
        <h2>Дані відсутні</h2>
      ) : (
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
      )}
    </>
  );
};

export default HomePage;
