import { StaticImageData } from "next/image";

export type IProject = {
  id?: string;
  title: string;
  tech: Array<string>;
  description: string;
  details?: Array<string>;
  features: Array<string>;
  img: { src: StaticImageData; alt: string };
  url: { live?: string; github?: string };
} | null;
