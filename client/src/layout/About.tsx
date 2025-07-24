// Image
import pizzaImg from "../assets/images/pizza.png";

// Icons
import { FaBookOpen, FaStar } from "react-icons/fa";

const About = () => {
  const cards = [
    {
      icon: <FaBookOpen size={36} color="#fd5c2e" />,
      title: "História",
      text: "Nossa história começou no coração da Itália, trazendo para você o autêntico sabor da pizza napolitana, feita com ingredientes selecionados e muito amor.",
    },
    {
      icon: <FaStar size={36} color="#fd5c2e" />,
      title: "Especial",
      text: "Além das pizzas clássicas, como a Margherita e a Diavola, criamos combinações especiais para surpreender seu paladar.",
    },
    {
      icon: <FaStar size={36} color="#fd5c2e" />,
      title: "História",
      text: "Desde [ano de fundação], mantemos viva a receita da família [Sobrenome], passada de geração em geração, para que cada mordidaseja uma experiência inesquecível. Aqui, a massa é artesanal, fermentada lentamente, e assada no forno a lenha, garantindo aquela crocância perfeita e um sabor único. Usamos apenas os melhores ingredientes, desde o tomate San Marzano até o queijo mozzarella fresca, porque acreditamos que a verdadeira pizza italiana começa com respeito aos detalhes. Tudo isso em um ambiente acolhedor, onde você se sente em casa, seja para um jantar em família, um encontro especial ou uma celebração com amigos. Grazie mille por fazer parte da nossa história! Esperamos recebê-lo em nossa pizzaria para compartilhar momentos deliciosos.",
    },
  ];
  return (
    <section className="container mx-auto grid grid-cols-1 items-center sm:grid-cols-2">
      <img src={pizzaImg} alt="Pizza" />

      {cards.map((card) => (
        <div className="">
          <h2 className="font-italian text-orange text-4xl">
            Mergulhe nas delícias do Pizzalicious
          </h2>

          <div className="flex flex-col items-center">
            {card.icon}
            <h3 className="text-dark-gray font-semibold">{card.title}</h3>
            <p className="text-light-gray">{card.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default About;
