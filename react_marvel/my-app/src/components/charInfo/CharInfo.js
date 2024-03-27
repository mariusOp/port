import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import "./charInfo.scss";
import MarvelService from "../../services/MarvelService";

const CharInfo = (props) => {
  const [charList, setCharList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fixed, setFixed] = useState(false);

  const marvelServices = new MarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    onCharLoading();
    marvelServices.getCharacters(charId).then(onCharLoaded).catch(onError);
  };
  const onCharLoaded = (charList) => {
    setLoading(false);
    setCharList(charList);
  };
  const onCharLoading = (charList) => {
    setLoading(true);
  };
  const onError = () => {
    setError(true);
    setLoading(false);
  };
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 450) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  });
  const skeleton = charList || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !charList) ? (
    <View char={charList} />
  ) : null;
  return (
    <div className={`char__info${fixed ? "-fixed" : ""}`}>
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  let imgStyle = { ObjectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { ObjectFit: "contain" };
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics with this character"}
        {comics.map((item, i) => {
          if (i > 10) return;
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
