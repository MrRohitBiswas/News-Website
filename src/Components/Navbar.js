import React from "react";
import { Link } from "react-router-dom";
import hamburgerMenu from './Images/hamburgerMenu.png';

class Navbar extends React.Component {
  categories = this.props.categories;

  constructor(props) {
    super(props)
    this.state = {
      navMenuDisplayed: false,
      x: "hidden",
      category: window.location.pathname.slice(1, window.location.pathname.length)
    };
  }

  toggleNavMenu = () => {
    this.setState({
      navMenuDisplayed: !this.state.navMenuDisplayed,
      x: !this.state.navMenuDisplayed ? "" : "hidden"
    });
  }

  choseCategory = (event) => {
    this.setState({
      category: event.target.innerText
    });
  }

  choseCategoryAndToggle = (event) => {
    this.choseCategory(event);
    this.toggleNavMenu();
  }


  render() {
    return (
      <nav className=" bg-gray-900 text-white z-40 drop-shadow-md fixed w-[100%] top-0 mb-2">

        {/* Nav Bar for mobile screens */}
        <div className="flex justify-between  py-4 px-3 md:hidden">
          <li className="list-none font-bold" key="app_name">NewsApp {this.state.category !== '' && '- ' + this.state.category}</li>
          <button className="" onClick={this.toggleNavMenu}><img src={hamburgerMenu} alt='menu' /></button>
        </div>

        <div className={this.state.x + " mt-1 md:hidden drop-shadow-md pb-2"}>
          <ul>
            {this.categories.map((item) => {
              return (
                <Link to={`./${item}`} key={item}>
                  <li className="list-none cursor-pointer hover:bg-gray-800 active:bg-gray-700 py-1 px-2 rounded-md" key={item} onClick={this.choseCategoryAndToggle}>{item}</li>
                </Link>
              );
            })}
          </ul>
        </div>

        {/* Nav Bar for bigger screens */}
        <div className="hidden md:block py-2 px-2">
          <ul className="flex gap-3">
            <li className="list-none font-bold py-2" key="app_name">NewsApp</li>
            {this.categories.map((item) => {
              return (

                <Link to={`./${item}`} key={item}>
                  {this.state.category === item ? <li className="list-none cursor-default py-2 bg-gray-700 px-1 rounded-md" onClick={this.choseCategory}>{item}</li> :
                    <li className="list-none cursor-pointer py-2 hover:bg-gray-800 active:bg-gray-700 px-1 rounded-md" onClick={this.choseCategory}>{item}</li>}
                </Link>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;