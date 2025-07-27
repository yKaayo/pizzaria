import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3000/";

export const getAllPizzas = async () => {
  try {
    const res = await axios.get("/pizzas");
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error);
  }
};
