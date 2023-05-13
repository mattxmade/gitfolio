import { DirectoryItem } from "@/app/types/application";
import { Fragment } from "react";

type Props = {
  name: string;
  contents: DirectoryItem[];
  children?: React.ReactNode;
};

const Contents = (props: Props) => {
  return (
    <Fragment>
      <h2>{props.name}</h2>
      <ul className="repo__content">
        <li className="repo__content__header">
          <p>
            author<span>{" <commit message>"}</span>
          </p>

          <div className="repo-nav-btns">
            <button className="nav-btn--grey">
              <i className="fa-solid fa-circle-arrow-left" />
            </button>
          </div>
        </li>

        {props.contents
          .sort((a, z) => a.type.localeCompare(z.type))
          .map((item, index) => {
            return (
              <Fragment>
                <li
                  className="repo-content__item"
                  key={item.name + "_" + index}
                >
                  <div style={{ display: "flex" }}>
                    <i
                      className={
                        item.name.includes(".")
                          ? "fa fa-regular fa-file"
                          : "fa fa-solid fa-folder"
                      }
                    />

                    <p className="repo-item--hover repo-item__item-name">
                      {item.name}
                    </p>
                  </div>
                </li>
              </Fragment>
            );
          })}
      </ul>
    </Fragment>
  );
};

export default Contents;
