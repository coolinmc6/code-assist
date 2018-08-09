import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CodeAssist from '../artwork/Code-Assist.png';

class NavBar extends Component {

	render() {
		return (
			<div>
			   <nav>
			       <div className="nav-wrapper">
			         <a href="https://coolinmc6.github.io/code-assist/" className="brand-logo"><img src={CodeAssist}/></a>
			         <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
			         <ul className="right hide-on-med-and-down">
			           <li><Link to="/code-assist/about">About</Link></li>
			           {/*<li><Link to="/code-assist/todos">Todo List</Link></li> */}
			         </ul>
			         <ul className="side-nav" id="mobile-demo">
			           <li><Link to="/code-assist/about">About</Link></li>
			           
			           {/*<li><Link to="/code-assist/todos">Todo List</Link></li>*/}
			         </ul>
			       </div>
			     </nav>
			</div>

		);
	}
}

export default NavBar;