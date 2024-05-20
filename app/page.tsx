// Types
import { IProject } from "@/app/types/application";

// Data
import { groups } from "@/app/data/content";

// Components
import Hero from "@/app/components/Hero";
import Main from "@/app/Main"; // client
import Group from "@/app/components/Group"; // server

export default function Home() {
  return (
    <>
      <Hero />

      <Main>
        {groups.map((group) => (
          <section key={group.id}>
            <Group
              id={group.id}
              heading={group.heading}
              projects={group.projects as IProject[]}
            />
          </section>
        ))}
      </Main>
    </>
  );
}
