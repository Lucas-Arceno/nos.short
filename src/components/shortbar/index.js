import classes from "./Shortbar.module.css";
import React, { useState, useEffect } from "react";
import createShortLink from "../../services/services.js";
import { Link } from "react-router-dom";
import { ListContext } from "../../context/ListContext";
import { useContext } from "react";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Shortbar() {
  const [inputValue, setInputValue] = useState("");
  const [wasClicked, setWasClicked] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const [linkShort, setLinkShort] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState(600);

  const { addNewLink } = useContext(ListContext);

  const handleSliderChange = (event) => {
    const tempo = parseInt(event.target.value)
    setSliderValue(tempo);
  };

  useEffect(() => {
    if (wasClicked) {
      setWasClicked(false);
      setIsReady(true);
    }
  }, [wasClicked]);

  useEffect(() => {
    const timeoutFunction = () => {
      setIsLoading(false);
    };

    if (isLoading) {
      const timeoutId = setTimeout(timeoutFunction, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isLoading]);

  useEffect(() => {
    const timeoutFunction = () => {
      setIsCheck(false);
    };

    if (isCheck) {
      const timeoutId = setTimeout(timeoutFunction, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isCheck]);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setIsClickable(value.trim() !== "");
  };

  const handleClick = (event) => {
    if (isClickable) {
      createShortLink("CREATE", inputValue, setLinkShort, addNewLink, sliderValue);
      setWasClicked(true);
    }
  };

  const handleClickClipboard = (event) => {
    if (isClickable) {
      setIsLoading(true);
      setWasClicked(true);
      toast.success("Foi copiado na sua área de transferência", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      navigator.clipboard.writeText(linkShort);
      setIsCheck(true);
    }
  };

  const handleClickReset = (event) => {
    setInputValue("");
    setIsReady(false);
    setIsClickable(false);
  };

  return (
    <>
      <div className={classes["main-container"]}>
        <div>
          {isReady ? (
            <div className={classes["second-container"]}>
              <input
                className={classes["input-style"]}
                value={linkShort}
                readOnly
              />
              {wasClicked ? (
                <button className={classes["button-style-clipboard"]} />
              ) : (
                <button
                  onClick={handleClickClipboard}
                  className={
                    isLoading
                      ? classes["button-loading"]
                      : classes["button-style-clipboard"]
                  }
                  disabled={!isClickable}
                />
              )}
            </div>
          ) : (
            <>
              <div className={classes["second-container"]}>
                <input
                  className={classes["input-style"]}
                  value={inputValue}
                  placeholder="Insira um link para encurtar..."
                  onChange={handleChange}
                />
                {wasClicked ? (
                  <button className={classes["button-style-clicked"]} />
                ) : (
                  <button
                    onClick={handleClick}
                    className={classes["button-style"]}
                    disabled={!isClickable}
                  />
                )}
              </div>
              {isClickable ? (
                <div>
                  <p  className={classes["sub-text"]} >Tempo de Duração do Link:</p>
                  <input
                    type="range"
                    min="60"
                    max="604800"
                    value={sliderValue}
                    id="myRange"
                    onChange={handleSliderChange}
                    className={classes["slider-range"]}
                  />
                  <p  className={classes["sub-text"]}>{sliderValue} Segundos</p>
                </div>
              ) : (
                " "
              )}
            </>
          )}
        </div>
        <div className={classes["text-container"]}>
          {isReady ? (
            <button onClick={handleClickReset} className={classes["sub-text"]}>
              Voltar para encurtar mais links
            </button>
          ) : (
            ""
          )}
          <Link to="/links" className={classes["sub-text"]}>
            Visualizar os últimos links encurtados
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Shortbar;
