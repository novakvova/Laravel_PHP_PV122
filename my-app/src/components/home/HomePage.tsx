import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICategoryItem } from "./types";

const HomePage = () => {
  const [list, setList] = useState<ICategoryItem[]>([]);

  useEffect(() => {
    axios.get<ICategoryItem[]>("http://127.0.0.1:8000/api/category")
    .then(resp=> {
      setList(resp.data);
    })
    .catch(bad=> {
      console.log("Bad request", bad);
    });
  }, []);
  

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
      <Link className="btn btn-success" to="/categories/create">Додати</Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Фото</th>
            <th scope="col">Назва</th>
            <th scope="col">Опис</th>
          </tr>
        </thead>
        <tbody>
          {dataView}
        </tbody>
      </table>
    </>
  );
};

export default HomePage;
