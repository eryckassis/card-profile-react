import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/css/all.min.css';

function CardProfile({ name, description, followers, isFollowing, onToggle, dark, imageSource }) {
  return (
    <article className={`card${dark ? ' dark' : ''}`}>
      <img src={imageSource} alt={`Perfil de ${name}`} />
      <section>
        <header>
          <h2>{name}</h2>
        </header>
        <p>{description}</p>
        <footer>
          <span className="tag" aria-label={`${followers} milhões de seguidores`}>
            <i className="fa-solid fa-user" aria-hidden="true"></i> {followers}M
          </span>
          <button type="button" className={isFollowing ? 'following' : ''} onClick={onToggle}>
            {isFollowing ? 'Unfollow' : 'Seguir'}
          </button>
        </footer>
      </section>
    </article>
  );
}

CardProfile.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  dark: PropTypes.bool.isRequired,
  imageSource: PropTypes.string.isRequired,
};

export default CardProfile;
