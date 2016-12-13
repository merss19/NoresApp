import React, { PropTypes } from 'react';
import { Button} from 'react-bootstrap';

const Header = ({checkAuth, signOut}) => {
    console.log('Header')
    //console.log(signOut)
    console.log(checkAuth)

  const btn = (
      <Button  onClick={signOut} bsStyle="primary" className="search-box__btn" >Logout</Button>
  )

    const logout = checkAuth ? btn : null


  return (
    <header className="header">
      <div className="g-row">
        <div className="g-col">
          <h1 className="header__title">Todo React Reduxzzzzzzzzzzzzzz</h1>

            {logout}
        </div>
      </div>
    </header>
  );
};

/*Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};*/

export default Header;
