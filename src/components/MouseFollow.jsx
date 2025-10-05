// // src/components/MouseFollow.jsx
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";

function MouseFollow({
  size = 60,
  color = "#f6f3f7",
  duration = 0.25,
  ease = "power3.out",
  enabled = true,
  zIndex = 9999,
  className = "",
  fadeOnHover = false,
}) {
  const circuloRef = useRef(null);
  const visivelRef = useRef(!fadeOnHover);

  useEffect(() => {
    const componente = circuloRef.current;
    if (!componente || !enabled) return;

    componente.style.width = `${size}px`;
    componente.style.height = `${size}px`;
    gsap.set(componente, { opacity: fadeOnHover ? 0 : 1 });

    const anguloX = gsap.quickTo(componente, "left", { duration, ease });
    const anguloY = gsap.quickTo(componente, "top", { duration, ease });

    const mostrar = () => {
      if (!fadeOnHover || visivelRef.current) return;
      visivelRef.current = true;
      gsap.to(componente, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const esconder = () => {
      if (!fadeOnHover || !visivelRef.current) return;
      visivelRef.current = false;
      gsap.to(componente, {
        opacity: 0,
        duration: 0.2,
        ease: "power4.out",
        overwrite: "auto",
      });
    };

    const pontoDeMovimento = (e) => {
      const x = e.clientX - size / 1.5;
      const y = e.clientY - size / 4;
      anguloX(x);
      anguloY(y);
      mostrar();
    };

    window.addEventListener("pointermove", pontoDeMovimento, { passive: true });
    document.addEventListener("mouseleave", esconder);
    window.addEventListener("blur", esconder);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") esconder();
    });

    return () => {
      window.removeEventListener("pointermove", pontoDeMovimento);
      document.removeEventListener("mouseleave", esconder);
      window.removeEventListener("blur", esconder);
    };
  }, [enabled, size, duration, ease, fadeOnHover]);

  return (
    <div
      ref={circuloRef}
      className={`mouse-follower ${className}`}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex,
        width: size,
        height: size,
        willChange: "left, top",
        transform: "translate3d(0,0,0)",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        role="presentation"
        focusable="false"
        style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
      >
        <path
          d="M75,100 C88.8071187,100 100,88.8071187 100,75 C100,61.1928813 88.8071187,50 75,50 C61.1928813,50 50,61.1928813 50,75 C50,88.8071187 61.1928813,100 75,100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

MouseFollow.PropTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  duration: PropTypes.number,
  ease: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  enabled: PropTypes.bool,
  zIndex: PropTypes.string,
  fadeOnHover: PropTypes.bool,
};

export default MouseFollow;
