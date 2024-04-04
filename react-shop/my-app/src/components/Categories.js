import React, { Component } from "react";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.setCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.categories !== prevProps.categories) {
      this.setCategories();
    }
  }

  render() {
    return (
      <div className="categories">
        {this.state.categories.map((el, index) => (
          <div key={index} onClick={() => this.props.choseCategory(el.key)}>
            {el.name}
          </div>
        ))}
      </div>
    );
  }

  setCategories() {
    const newCategories = this.props.categories.map((el) => {
      return {
        name: el,
        key: el,
      };
    });

    const categoriesWithAll = [{ name: "all", key: "all" }, ...newCategories];

    this.setState({ categories: categoriesWithAll });
  }
}

export default Categories;
