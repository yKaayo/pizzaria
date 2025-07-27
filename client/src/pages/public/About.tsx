import { toast } from "react-toastify";

// Image
import pizzaImg from "../../assets/images/pizza.webp";

// Icons
import { FaBookOpen, FaStar, FaPizzaSlice } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { useEffect } from "react";

const About = () => {
  const notify = () => toast.success("Wow so easy !");

  const cards = [
    {
      icon: <FaBookOpen size={30} color="#fd5c2e" />,
      title: "História",
      text: "Nossa história começou no coração da Itália, trazendo para você o autêntico sabor da pizza napolitana, feita com ingredientes selecionados e muito amor.",
    },
    {
      icon: <FaStar size={30} color="#fd5c2e" />,
      title: "Especial",
      text: "Além das pizzas clássicas, como a Margherita e a Diavola, criamos combinações especiais para surpreender seu paladar.",
    },
    {
      icon: <FaPizzaSlice size={30} color="#fd5c2e" />,
      title: "Comida",
      text: "Aqui, a massa é artesanal, fermentada lentamente, assada no forno a lenha, e usando apenas os melhores ingredientes, desde o tomate San Marzano até o queijo mozzarella fresca garantindo aquela crocância perfeita e um sabor único.",
    },
    {
      icon: <SiHomeassistantcommunitystore size={30} color="#fd5c2e" />,
      title: "Ambiente",
      text: "Tudo isso em um ambiente acolhedor, onde você se sente em casa, seja para um jantar em família, um encontro especial ou uma celebração com amigos.",
    },
  ];

  useEffect(() => {
    notify();
  }, []);

  return (
    <section className="container mx-auto grid min-h-[calc(100vh-60px)] grid-cols-1 items-center px-5 py-10 sm:px-0 md:grid-cols-2">
      <div
        style={{
          background: `url(${pizzaImg}) center/contain no-repeat`,
        }}
        className="h-[250px] md:h-full"
      ></div>

      <div className="flex flex-col gap-8">
        <h2 className="font-italian text-orange mx-auto text-center text-5xl text-balance sm:text-start md:mx-0">
          Mergulhe nas delícias do Pizzalicious
        </h2>

        <div className="grid grid-cols-2 gap-x-5">
          {cards.map((card, i) => (
            <div
              key={i}
              style={{ marginTop: i % 2 !== 0 ? `${68}px` : "0" }}
              className="flex flex-col"
            >
              {card.icon}
              <h3 className="text-dark-gray mt-1 mb-3 text-xl font-semibold">
                {card.title}
              </h3>
              <p className="text-light-gray text-sm text-balance">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
