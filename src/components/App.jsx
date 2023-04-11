import React, { useState } from "react";

import content from "../content";
import Group from "./Group";

const App = () => {
  const [currentProject, setCurrentProject] = useState();

  const handleSelectProject = (e, selectedProject) => {
    setCurrentProject(selectedProject);
    modalRef.current.showModal();
  };

  return (
    <div className="wrapper">
      <header></header>

      {currentProject ? <ProjectDialog /> : null}

      <main>
        <section>
          <Group
            projects={[...new Array(1)].map((v, i) => content.projects[i])}
            groupName="HTML CSS JavaScript"
            handleSelectProject={handleSelectProject}
          />
        </section>

        <section>
          <Group
            projects={[...new Array(1)].map((v, i) => content.projects[i])}
            groupName="Design briefs | Repsonsive design"
            handleSelectProject={handleSelectProject}
          />
        </section>

        <section>
          <Group
            projects={[...new Array(1)].map((v, i) => content.projects[i])}
            handleSelectProject={handleSelectProject}
          />
        </section>

        <section>
          <Group
            projects={[...new Array(1)].map((v, i) => content.projects[i])}
            handleSelectProject={handleSelectProject}
          />
        </section>
      </main>

      <footer></footer>
    </div>
  );
};

export default App;
