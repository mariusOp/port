import "./style.css";

const Header = () => {
  const onDownload = () => {
    const Url = "https://github.com/mariusOp/portfolio/blob/main/CV.docx";
    const link = document.createElement("a");
    link.href = Url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className="header__title">
          <strong>
            Hi, my name is <em>Marius</em>
          </strong>
          <br />a frontend developer
        </h1>
        <div className="header__text">
          <p>with passion for learning and creating.</p>
        </div>
        <a href="#" className="btn" onClick={onDownload}>
          Download CV
        </a>
      </div>
    </header>
  );
};

export default Header;
