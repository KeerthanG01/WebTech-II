import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import { NavLink } from "react-router-dom";
import M from "materialize-css";

class Composenav extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <header>
        <nav>
          <div className="nav-wrapper blue">
            <a href="#" className="brand-logo">
            <b>K-Mail</b>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a className="waves-effect waves-light btn green" href="#">
                  <NavLink to="/home" exact>
                    Home
                  </NavLink>
                </a>

                <a className="waves-effect waves-light btn green" href="#">
                  <NavLink to="/logout" exact>
                    Logout
                  </NavLink>
                </a>

                
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Composenav;