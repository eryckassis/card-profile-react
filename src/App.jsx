import { useState } from "react";
import CardProfile from "./components/Card/Card.jsx";
import "./styles/App.css";
const imagemParaOsCards = "/viking.png";

function App() {
  const [isFollowing, setIsFollowing] = useState([false, false]);

  const cardsProfile = [
    {
      name: "Eivor Ragnarson",
      description:
        "Também conhecido como Marca de Lobo, era uma jovem jomsviking da Noruega.",
      followers: 15,
      dark: false,
      imageSource: imagemParaOsCards,
    },
    {
      name: "Eivor Ragnarson",
      description:
        "Também conhecido como Marca de Lobo, era uma jovem jomsviking da Noruega.",
      followers: 15,
      dark: true,
      imageSource: imagemParaOsCards,
    },
  ];

  const handleToggle = (cardIndex) => {
    setIsFollowing((prevFollowStates) =>
      prevFollowStates.map((isFollowed, index) =>
        index === cardIndex ? !isFollowed : isFollowed
      )
    );
  };

  return (
    <main>
      {cardsProfile.map((cardData, cardIndex) => (
        <CardProfile
          key={cardIndex}
          {...cardData}
          isFollowing={isFollowing[cardIndex]}
          onToggle={() => handleToggle(cardIndex)}
        />
      ))}
    </main>
  );
}

export default App;

//
