import React from "react";
import { Link } from "react-router-dom";
import { dataHomeSubRequest } from "../home";
interface Props {
  data: dataHomeSubRequest[];
}
export const SubHomeItem: React.FC<Props> = ({ data }) => {
  console.log(data, "unitValue");
  return (
    <div className="subhomeitem-home">
      {data &&
        data.map((item, index) => (
          <Link
            to={item.path}
            tabIndex={1}
            onClick={() => console.log("slam")}
            className="item-box-subhomeitem  item-color-blue-box-homeItems"
          >
            <div className="top-item-box-homeItems">
              <p className="name-item-box-subhomeitem">{item.name}</p>
            </div>
            {item.numRequest !== 0 ? (
              <p className="number-request-item-box-subhomeitem">
                {item.numRequest} {item.subName}
              </p>
            ) : (
              <p className="number-request-item-box-subhomeitem">
                درخواستی ندارید
              </p>
            )}
          </Link>
        ))}
    </div>
  );
};
