import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="header">
      <div className="container mx-auto">
        <div className="relative flex justify-center items-center text-white">
          <nav className="absolute left-0">
            <ul className="nav--list">
              <li>
                <NavLink to="/">Início</NavLink>
              </li>
              <li>
                <NavLink to="/sobre-mim">Sobre nós</NavLink>
              </li>
              <li>
                <NavLink to="/">Menu</NavLink>
              </li>
              <li>
                <NavLink to="/">Contato</NavLink>
              </li>
            </ul>
          </nav>

          <h1 className="font-italian text-5xl my-1.5">
            Pizzalicious
          </h1>

          <ul className="nav--list absolute right-0">
            <li>
              <button>Entrar</button>
            </li>
            <li>
              <button>Cadastrar</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
