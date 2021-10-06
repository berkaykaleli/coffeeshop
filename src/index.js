import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./assets/styles/Main.css";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["description", "title", "ingredients"]);
  const [filterParam, setFilterParam] = useState(["All"]);

  useEffect(() => {
    fetch("./data/coffees.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function search(items) {
    return items.filter((item) => {
      if (item.category == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  if (error) {
    return <>{error.message}</>;
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return (
      <div className="wrapper">
        <div className="row">
          <div className="search-wrapper">
            <div className="filter-elements">
              <label htmlFor="search-form">
                <input
                  type="search"
                  name="search-form"
                  className="form-control"
                  placeholder="Search..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </label>
              <div className="mt-20">
                <button
                  className={
                    filterParam == "All" ? "active categories" : "categories"
                  }
                  value="All"
                  onClick={(e) => {
                    setFilterParam(e.target.value);
                  }}
                >
                  All
                </button>
                <button
                  className={
                    filterParam == "iced" ? "active categories" : "categories"
                  }
                  value="iced"
                  onClick={(e) => {
                    setFilterParam(e.target.value);
                  }}
                >
                  Iced
                </button>
                <button
                  className={
                    filterParam == "hot" ? "active categories" : "categories"
                  }
                  value="hot"
                  onClick={(e) => {
                    setFilterParam(e.target.value);
                  }}
                >
                  Hot
                </button>
              </div>
            </div>
          </div>
          <div className="coffees-wrapper">
            {search(items).map((item) => (
              <div className="coffee-item">
                <article className="card" key={item.id}>
                  <div className="card-content">
                    <h2 className="card-name">{item.title}</h2>
                    <p>{item.description}</p>
                    <span>Ingredients: {item.ingredients.join(", ")}</span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
