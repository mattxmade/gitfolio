import { createContext } from "react";
import { IProject } from "../types/application";
import { DirectoryItem } from "@/app/api/services/github/types";

// TODO
// - [x] Create Project Type

// :: Context Provider Type Definitions for Application ::
// Incorrect setState types throws error when consumed with useContext [ see Button.tsx ]
// Need to set types using Dispatach + SetStateAction with expected type

export type IProjectContextProvider = {
  isHydrated: React.MutableRefObject<boolean>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentProject: IProject;
  setCurrentProject: React.Dispatch<React.SetStateAction<any>>;
  currentProjects: React.MutableRefObject<
    Array<{ id: string; hasData: boolean; ui: boolean }>
  >;
} | null;

export const ProjectContext = createContext<IProjectContextProvider>(null);
