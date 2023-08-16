import classes from "./Header.module.css"

function Header() {
  return (
    <header className={classes["main-container"]}>
      <div className={classes["logo-container"]}>
        <img src='./img/Logo.svg' alt="Logo do Nós"></img>
      </div>
      <div className={classes["text-container"]}>
        <div className={classes["main-text"]}>nós.short</div>
        <div className={classes["sub-text"]}>O melhor encurtador de endereços</div>
      </div>
    </header>
  );
}

export default Header;