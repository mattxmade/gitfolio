import { StaticImageData } from "next/image";
import { DirectoryItem } from "@/app/api/services/github/types";

export type IProject = {
  id: string;
  repo: string;
  title: string;
  tech: Array<string>;
  description: string;
  details?: Array<string>;
  features: Array<string>;
  img: { src: StaticImageData; alt: string };
  url: { live?: string; github?: string };
} | null;

export type IGitResponse = {
  status: string;
  message: string;
  data: IRepository;
};

export type IRepository = {
  name: string;
  contents: DirectoryItem[];
};
