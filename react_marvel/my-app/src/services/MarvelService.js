class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=f5aed919957ddd968809b356fc4d7e77";

  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };
  getAllCharacters = async (num) => {
    console.log(num);
    const res = await this.getResource(
      `${this._apiBase}characters?limit=${num}&offset=210&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };
  getCharacters = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };
  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export default MarvelService;
