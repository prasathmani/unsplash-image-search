import React, { useReducer, useState } from "react";
import { init, imgReducer } from "../store";

const Search = ({ cb }) => {
  const [search, setSeatch] = useState("");
  const [state, dispatch] = useReducer(imgReducer, {
    images: [],
    fetching: false,
  }, init);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "RESET_IMAGES" });
    cb(search);
  };

  return (
    <div className="container">
      <div className="row">
        <form className="form-inline my-2 col-12" onSubmit={handleSubmit}>
          <input
            className="form-control mr-sm-2 col-8"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => setSeatch(e.currentTarget.value)}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
