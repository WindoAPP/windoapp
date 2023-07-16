import Particles  from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // loads tsparticles-slim
//import { loadFull } from "tsparticles"; // loads tsparticles
import { useCallback, useMemo } from "react";

// tsParticles Repository: https://github.com/matteobruni/tsparticles
// tsParticles Website: https://particles.js.org/
const ParticlesComponent = (props) => {
    
  // using useMemo is not mandatory, but it's recommended since this value can be memoized if static
  const options = useMemo(() => {
    // using an empty options object will load the default options, which are static particles with no background and 3px radius, opacity 100%, white color
    // all options can be found here: https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
    return {
        background: {
            color: {
              value: '#000000', // Set your desired background color
            },
          },
          particles: {
            number: {
              value: 0, // Set initial number of particles to 0
            },
            shape: {
              type: 'circle', // Customize the particle shape (e.g., circle, square, image, etc.)
            },
            size: {
              value: 3, // Set the initial size of particles
            },
            move: {
              enable: true, // Allow particles to move
              direction: 'none', // Set the initial movement direction (e.g., none, top, top-right, etc.)
              speed: 5, // Adjust the speed of particles
            },
            opacity: {
              value: 1, // Set the initial opacity of particles
            },
            color: {
              value: ['#ff0000', '#00ff00', '#0000ff'], // Customize the colors of particles (e.g., for fireworks effect)
            },
            life: {
              duration: {
                sync: true, // Synchronize the duration of all particles
              },
              count: 1, // Set the number of particles that will be generated for the fireworks effect
            },
            links: {
              enable: false, // Disable particle links (fireworks usually do not have links)
            },
          },
          interactivity: {
            detectsOn: 'canvas',
            events: {
              resize: true,
            },
          },
    };
  }, []);

  // useCallback is not mandatory, but it's recommended since this callback can be memoized if static
  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
    // loadFull(engine); // for this sample the slim version is enough, choose whatever you prefer, slim is smaller in size but doesn't have all the plugins and the mouse trail feature
  }, []);

  // setting an id can be useful for identifying the right particles component, this is useful for multiple instances or reusable components
  return <Particles id={props.id} init={particlesInit} options={options} />;
};

export default ParticlesComponent;
