import { createContext, useContext, useState } from "react";

const ProjectFormContext = createContext(null);

export function ProjectFormProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <ProjectFormContext.Provider value={{ open, openForm: () => setOpen(true), closeForm: () => setOpen(false) }}>
      {children}
    </ProjectFormContext.Provider>
  );
}

export function useProjectForm() {
  const ctx = useContext(ProjectFormContext);
  if (!ctx) throw new Error("useProjectForm must be used inside ProjectFormProvider");
  return ctx;
}
