import { useEffect, useState } from "react";
import "./charList.scss";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [num, setNum] = useState(9);

  const marvelServices = new MarvelService();

  useEffect(() => {
    moreCharracters();
  }, []);
  const moreCharracters = () => {
    setNum(num + 3);
    console.log(num);
    onRequest();
  };
  const onRequest = () => {
    marvelServices.getAllCharacters(num).then(onCharListLoaded).catch(onError);
  };
  const onCharListLoaded = (charList) => {
    setCharList(charList);
    setLoading(false);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };
  const { onCharSelected } = props;
  function renderItems(arr) {
    const items = arr.map((item) => {
      let imgStyle = { ObjectFit: "cover" };
      if (
        item.thubnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { ObjectFit: "contain" };
      }
      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => onCharSelected(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }
  const items = renderItems(charList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;
  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        className="button button__main button__long"
        onClick={moreCharracters}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
