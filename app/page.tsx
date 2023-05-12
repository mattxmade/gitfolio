// export const revalidate = 0;

// Types
import { IProject } from "./types/application";

// Data
import content from "./data/content";

// Components
import Main from "./Main"; // client
import Group from "./components/Group"; // server

export default function Home() {
  return (
    <div className="wrapper">
      <div className="overlay">
        <header></header>
        <Main>
          <section>
            <Group
              id="vanilla"
              heading="HTML CSS JavaScript"
              projects={content.vanilla as IProject[]}
            />
          </section>

          <section>
            <Group
              id="design"
              heading="Design briefs | Repsonsive design"
              projects={content.briefs as IProject[]}
            />
          </section>

          <section>
            <Group
              id="react"
              heading="React"
              projects={content.react as IProject[]}
            />
          </section>

          <section>
            <Group
              id="threejs"
              heading="ThreeJS"
              projects={
                [...new Array(1)].map(
                  (v, i) => content.projects[i]
                ) as IProject[]
              }
            />
          </section>
        </Main>
        <footer></footer>
      </div>
    </div>
  );
}
