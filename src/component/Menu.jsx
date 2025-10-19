import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios
      .get("/menus/15")
      .then((response) => {
        const menuList = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setMenus(menuList);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, []);



  return (
    <center className="site__menu">
      <div className="container" style={{ position: "relative" }}>
        <nav id="navbar" className="navbar">
          <ul className="url__li" style={{ listStyle: "none", paddingLeft: 0 }}>
            {menus.map((menu, index) => {
              return (
                <li
                  key={menu.id}
                  className={`${menu.sub_menu?.length > 0 ? "dropdown" : ""} ${
                    index === 0 ? "active" : ""
                  }`}
                  style={{ position: "" }}
                >
                  <Link
                    to={menu.url_path}
                    onClick={(e) => {
                      if (menu.sub_menu?.length > 0) {
                        e.preventDefault();
                        toggleSubMenu(menu.id);
                      }
                    }}
                    className={menu.sub_menu?.length > 0 ? "dropdown-toggle" : ""}
                    
                    style={{ cursor: menu.sub_menu?.length > 0 ? "pointer" : "default" }}
                  >
                    {menu.url_text}
                    {menu.sub_menu?.length > 0 && <span className="caret"></span>}
                  </Link>

                  {menu.sub_menu?.length > 0  && (
                    <ul
                      className="dropdown-menu"
                      style={{
                        position: "absolute",
                        background: "white",
                        border: "1px solid #ccc",
                        padding: "10px",
                        zIndex: 1000,
                        minWidth: "150px",
                        top: "100%",
                        left: 0,
                      }}
                    >
                      {menu.sub_menu.map((submenu) => (
                        <li key={submenu.id} style={{ marginBottom: "5px" }}>
                          <Link to={submenu.url_path}>{submenu.url_text}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </center>
  );
};

export default Menu;
