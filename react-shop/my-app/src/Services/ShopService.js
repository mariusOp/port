class ShopService {
  _apiBase = "https://fakestoreapi.com/products";

  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };
  getAllProducts = async () => {
    const res = await this.getResource(`${this._apiBase}`);
    return res.map((el) => this._transformProduct(el));
  };
  getCategories = async () => {
    const res = await this.getResource(`${this._apiBase}/categories`);
    return res;
  };
  _transformProduct = (pr) => {
    return {
      id: pr.id,
      category: pr.category,
      description: pr.description,
      price: pr.price,
      title: pr.title,
      image: pr.image,
    };
  };
}

export default ShopService;
