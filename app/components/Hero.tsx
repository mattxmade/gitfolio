import Image from "next/image";
import React from "react";

import DivMask from "./transitions/elementLibrary";
import ContactCard from "./widgets/ContactCard";
import { Cube, Cubes } from "./icons/FontAwesome";

import { about, links, heroContent } from "../data/content";

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
            priority
            id="hero-img"
            src={heroContent.image.src}
            alt={heroContent.image.alt}
          />
        </div>

        <div id="contact" className="hero__content">
          <div className="hero__content__about">
            <header
              style={{
                gap: 0,
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                padding: 0,
                backgroundColor: "transparent",
              }}
            >
              <h1>{about.heading.c}</h1>
              <i
                style={{
                  width: "2.5rem",
                  top: "0.5rem",
                  left: "1rem",
                  position: "relative",
                  fill: "palevioletred",
                }}
              >
                <Cubes />
              </i>
            </header>

            <ul
              style={{
                flex: "auto",
                display: "grid",
                padding: "1rem",
                position: "relative",
                marginLeft: "1rem",
              }}
            >
              {about.info.map((info, i) => (
                <li
                  key={i}
                  style={{
                    gap: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    style={{
                      width: "1.5rem",
                      display: "block",
                      position: "relative",
                      fill: "palevioletred",
                    }}
                  >
                    <Cube />
                  </i>
                  <p key={i}>{info}</p>
                </li>
              ))}
            </ul>
          </div>

          <ContactCard className="hero__content__contact" />
        </div>
      </div>
    </DivMask>
  );
};

export default Hero;
