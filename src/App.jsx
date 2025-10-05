import { useState } from "react";
import CardProfile from "./components/Card/Card.jsx";
import MouseFollow from "./components/MouseFollow.jsx";
import "./styles/App.css";
import "./styles/MouseFollow.css";
const imagemParaOsCards = "/perfil.png";

function App() {
  const [isFollowing, setIsFollowing] = useState([false, false]);

  const cardsProfile = [
    {
      name: "Alissa Dotter ",
      description:
        "Também conhecido como Marca de Lobo, era uma jovem jomsviking da Noruega.",
      followers: 15,
      dark: false,
      imageSource: imagemParaOsCards,
    },
    {
      name: "Alissa Dotter",
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
      <MouseFollow
        size={60}
        color="#f6f3f7"
        duration={0.25}
        ease="power3.out"
        enabled={matchMedia?.("(pointer: fine)").matches ?? true}
        fadeOnHover={true}
      />
    </main>
  );
}

export default App;

//
