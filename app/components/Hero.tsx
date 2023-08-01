"use client";

import Image from "next/image";
import React from "react";

import { about, links, heroContent } from "../data/content";
import DivMask from "./transitions/elementLibrary";

const Hero = () => {
  return (
    <DivMask offset={0} delay={800}>
      <div className="splash-screen" id={links[0].text}>
        <a
          href={links[0].href}
          style={{ position: "absolute", visibility: "hidden" }}
        />

        <div className="splash-screen__hero">
          <Image
            id="hero-img"
            src={heroContent.image.src}
            alt={heroContent.image.alt}
          />
        </div>

        <div className="hero__content">
          <h1>{about.heading.c}</h1>

          {about.info.map((info, i) => (
            <p key={i}>{info}</p>
          ))}
        </div>
      </div>
    </DivMask>
  );
};

export default Hero;
