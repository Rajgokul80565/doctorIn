import React, { useEffect, useRef } from 'react';
import "./logoslider.css";
import blklogo from "../../assets/images/blk.png";
import kmchlogo from "../../assets/images/kmch.png";
import  fortislogo from "../../assets/images/fortis.jpg"
import apollologo from "../../assets/images/apollo_hospitals.png"
import mayocliniclogo from "../../assets/images/Mayo_Clinic.jpg"
import medantalogo from "../../assets/images/medanta.jpg"



const LogosSlider = () => {
  const logosRef = useRef(null);

  useEffect(() => {
    const copyLogosSlide = () => {
      const logosSlide = logosRef.current.querySelector('.logos-slide');
      const copy = logosSlide.cloneNode(true);
      logosRef.current.appendChild(copy);
    };

    copyLogosSlide();
  }, []);

  return (
    <div className="logos" ref={logosRef} >
      <div className="logos-slide" >
        <img src={kmchlogo} alt="KMCH" />
        <img src={blklogo} alt="BLK" />
        <img src={fortislogo} alt="Fortis" />
        <img src={apollologo} alt="Apollo" />
        <img src={mayocliniclogo} alt="Mayo" />
        <img src={medantalogo} alt="Medanta" />
      </div>
    </div>
  );
};

export default LogosSlider;