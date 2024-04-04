import { Component } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import ShopService from "./Services/ShopService";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
      orders: [],
      currentItems: [],
      showFullItem: false,
      fullItem: {},
      cartOpen: false,
    };
    this.state.currentItems = this.state.items;
    this.onShowItem = this.onShowItem.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.choseCategory = this.choseCategory.bind(this);
    this.changeCartOpen = this.changeCartOpen.bind(this);
    this.AddProducts = this.AddProducts.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }
  componentDidMount() {
    this.AddProducts();
    this.getCategories();
  }
  render() {
    return (
      <div className="wrapper">
        <Header
          cartOpen={this.state.cartOpen}
          changeCartOpen={this.changeCartOpen}
          onDelete={this.deleteOrder}
          orders={this.state.orders}
        />
        <Categories
          categories={this.state.categories}
          choseCategory={this.choseCategory}
        />
        <Items
          onShowItem={this.onShowItem}
          items={this.state.currentItems}
          onAdd={this.addToOrder}
        />
        {this.state.showFullItem && (
          <ShowFullItem
            onAdd={this.addToOrder}
            onShowItem={this.onShowItem}
            item={this.state.fullItem}
          />
        )}
        <Footer />
      </div>
    );
  }

  async AddProducts() {
    const shopService = new ShopService();

    try {
      const products = await shopService.getAllProducts();
      this.setState({ items: products });
    } catch (error) {
      console.error(error);
    }
  }

  async getCategories() {
    const shopService = new ShopService();
    try {
      const cat = await shopService.getCategories();
      this.setState({ categories: cat });
    } catch (error) {
      console.error(error);
    }
  }

  changeCartOpen() {
    this.setState({ cartOpen: !this.state.cartOpen });
  }
  onShowItem(item) {
    this.setState({ fullItem: item });
    this.setState({ showFullItem: !this.state.showFullItem });
  }
  choseCategory(category) {
    if (category === "all") {
      this.setState({
        currentItems: this.state.items,
      });
      return;
    }
    this.setState({
      currentItems: this.state.items.filter((el) => el.category === category),
    });
  }
  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter((el) => el.id !== id) });
  }
  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === item.id) isInArray = true;
    });
    if (!isInArray)
      this.setState({ orders: [...this.state.orders, item] }, () => {
        console.log(item);
      });
  }
}

export default App;
