import { useState } from "react";
import CardProfile from "./components/Card.jsx";
import "./App.css";

const vikingImg = "/viking.png";

function App() {
  const [isFollowing, setIsFollowing] = useState([false, false]);

  const cards = [
    {
      name: "Eivor Ragnarson",
      description:
        "Também conhecido como Marca de Lobo, era uma jovem jomsviking da Noruega.",
      followers: 15,
      dark: false,
      imgSrc: vikingImg,
    },
    {
      name: "Eivor Ragnarson",
      description:
        "Também conhecido como Marca de Lobo, era uma jovem jomsviking da Noruega.",
      followers: 15,
      dark: true,
      imgSrc: vikingImg,
    },
  ];

  const handleToggle = (idx) => {
    setIsFollowing((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

  return (
    <main>
      {cards.map((card, idx) => (
        <CardProfile
          key={idx}
          {...card}
          isFollowing={isFollowing[idx]}
          onToggle={() => handleToggle(idx)}
        />
      ))}
    </main>
  );
}

export default App;
