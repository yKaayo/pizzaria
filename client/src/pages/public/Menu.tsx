import { useEffect } from "react";

// API
import { getAllPizzas } from "../../services/api";

const Menu = () => {
  useEffect(() => {
    const getPizzas = async () => {
      const pizzas = await getAllPizzas();
      console.log(pizzas);

      return pizzas;
    };

    getPizzas();
  });
  return <section></section>;
};

export default Menu;
