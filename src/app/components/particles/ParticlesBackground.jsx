"use client";
import Particles from "react-tsparticles";
import particlesOptions from "./particlesOptions";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (main) => {
    console.log(main);
    await loadFull(main);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
    />
  );
};

export default ParticlesBackground;
