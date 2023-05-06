import { useFormik } from "formik";
import { ChangeEvent, FormEvent, useState } from "react";
import { ICategoryCreate } from "./types";

const CategoryCreatePage = () => {

  const initValues : ICategoryCreate = {
    name: "",
    image: "",
    description: "",
  };
  

  const onSubmitFormikData = (values: ICategoryCreate) => {
    console.log("Formik send data", values);
  }

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: onSubmitFormikData
  });

  const {values, handleSubmit, handleChange} = formik;

  return (
    <>
      <h1 className="text-center">Додати категорію</h1>
      <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Назва
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Фото
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={values.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            placeholder="Вкажіть опис"
            id="description"
            name="description"
            style={{ height: "100px" }}
            value={values.description}
            onChange={handleChange}

          ></textarea>
          <label htmlFor="description">Опис</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Додати
        </button>
      </form>
    </>
  );
};
export default CategoryCreatePage;
