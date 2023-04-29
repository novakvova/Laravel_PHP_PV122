const CategoryCreatePage = () => {
  return (
    <>
      <h1 className="text-center">Додати категорію</h1>
      <form className="col-md-6 offset-md-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Назва
          </label>
          <input type="text" className="form-control" id="name" name="name" />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Фото
          </label>
          <input type="text" className="form-control" id="image" name="image" />
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            placeholder="Вкажіть опис"
            id="description"
            style={{ height: "100px" }}
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
