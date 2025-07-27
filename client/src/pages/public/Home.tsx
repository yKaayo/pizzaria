import { useEffect } from "react";

// API
import { getAllPizzas } from "../../services/api";

const Home = () => {
  useEffect(() => {
    const getPizzas = async () => {
      const pizzas = await getAllPizzas();
      console.log(pizzas);
    };

    getPizzas();
  }, []);

  return <main></main>;
};

export default Home;
