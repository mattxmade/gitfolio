import { createContext } from "react";
import { IProject } from "../types/application";

// TODO
// - [x] Create Project Type

// :: Context Provider Type Definitions for Application ::
// Incorrect setState types throws error when consumed with useContext [ see Button.tsx ]
// Need to set types using Dispatach + SetStateAction with expected type

export type IProjectContextProvider = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentProject: IProject;
  setCurrentProject: React.Dispatch<React.SetStateAction<any>>;
} | null;

export const ProjectContext = createContext<IProjectContextProvider>(null);
