import React from "react";

const Card = (props) => {
  const {
    id,
    urls: { small },
  } = props;

  return (
    <div className="card col-sm-12 col-md-3">
      <div className="card-body">
        <img alt={id} className="card-img-top" data-src={small} src={small} />
      </div>
    </div>
  );
};

export default Card;
