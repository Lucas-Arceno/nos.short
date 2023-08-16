import Header from "../../components/header";
import Footer from "../../components/footer";
import classes from "./Links.module.css";

import { ListContext } from "../../context/ListContext";
import removeShortLinks from "../../services/services.js";

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

function LinksEncurtadosPage() {
  const { listShort, removeLink } = useContext(ListContext);
  const [linkList, setLinkList] = useState([]);

  useEffect(() => {
    setLinkList(listShort);

    for (const link of listShort) {
      if (link.ttl === 0) {
        handleDelete(link.link_url);
      }
    }
  }, [listShort]);

  const handleDelete = (element) => {
    removeShortLinks("REMOVE", element);
    removeLink(element);
    setLinkList(linkList.filter((link) => link.link_url !== element));
  };

  const handleClickClipboard = (link) => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div>
      <Header />
      <div className={classes["container"]}>
        {linkList.map((link, index) => (
          <div key={index}>
            <div className={classes["sub-text"]}>
              <p>Link original: {link.url}</p>
              <p>Expira em: {link.ttl} segundos</p>
            </div>
            <div className={classes["second-container"]}>
              <input
                className={classes["input-style"]}
                placeholder={link.link_url}
                readOnly
              ></input>
              <button
                onClick={() => handleClickClipboard(link.link_url)}
                className={classes["button-style"]}
              />
            </div>
            <button
              onClick={() => handleDelete(link.link_url)}
              className={classes["remove-button"]}
            >
              <img
                className={classes["remove-icon"]}
                src="./img/Trash.png"
                alt="Icone Trash"
              />
              <p className={classes["remove-text"]}>Remover</p>
            </button>
          </div>
        ))}
        <Link to="/" className={classes["link-text"]}>
          Voltar para encurtar mais links
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default LinksEncurtadosPage;
