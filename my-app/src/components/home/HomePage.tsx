import { useState } from "react";
import { ICategoryItem } from "./types";

const HomePage = () => {
  const [list, setList] = useState<ICategoryItem[]>([]);

  const onAddCategory=() => {
    const item : ICategoryItem = {
      id: 4,
      description: "Козак",
      name: "Нормальний пацан",
      image: "https://www.stryi.net.ua/wp-content/uploads/2023/02/kozak-360x480.webp"
    };
    setList([item]);
  }

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
      <button className="btn btn-success" onClick={onAddCategory}>Додати</button>
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
