import { NavLink } from 'react-router-dom';

function BurgerTool(props) {
    return (
        <div className="burgertool">
            <p className="burgertool__email">{props.email}</p>
            <NavLink className="burgertool__link" to="/sign-in" onClick={props.handleLogout}>Выйти</NavLink>
        </div>
    );
}

export default BurgerTool;