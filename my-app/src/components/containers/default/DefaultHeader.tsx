import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import http from "../../../http";
import { AuthUserActionType, IAuthUser } from "../../auth/types";
import "./DefaultHeader.css";

const DefaultHeader = () => {
  
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);

  const logout = () => {
    delete http.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    dispatch({type: AuthUserActionType.LOGOUT_USER});
  }

  console.log("is Auth", isAuth);

  return (
    <>
      <header data-bs-theme="dark">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Магазинчик
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/categories/create"
                  >
                    Додати
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Link
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled">Disabled</a>
                </li>
              </ul>
              <ul className="navbar-nav">
                {isAuth ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to="/profile"
                      >
                        {user?.email}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to="/logout"
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                        }}
                      >
                        Вихід
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to="/register"
                      >
                        Реєстрація
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to="/login"
                      >
                        Вхід
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default DefaultHeader;
