import {
  getProfile,
  getProjects,
  getExperiences,
  getTechnologies,
  getSettings,
} from '@/lib/sanity/services';
import { urlFor } from '@/lib/sanity/image';
import Nav from '@/components/sections/Nav';
import ProfileCard from '@/components/sections/ProfileCard';
import BioSection from '@/components/sections/BioSection';
import ProjectCard from '@/components/ui/ProjectCard';
import ExperienceCard from '@/components/ui/ExperienceCard';
import TechnologyCard from '@/components/ui/TechnologyCard';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/sections/Footer';

export default async function Home() {
  const [profile, projects, experiences, technologies, settings] =
    await Promise.all([
      getProfile(),
      getProjects(),
      getExperiences(),
      getTechnologies(),
      getSettings(),
    ]);

  return (
    <>
      <Nav />

      <main>
        {profile && (
          <ProfileCard
            name={profile.name}
            subtitle={profile.role}
            photoUrl={profile.photo ? urlFor(profile.photo).url() : undefined}
            socialLinks={profile.socialLinks?.map(({ platform, url }) => ({
              platform,
              url,
            }))}
          />
        )}

        {profile?.heroDescription && (
          <BioSection title={profile.role} content={profile.heroDescription} />
        )}

        <section>
          {projects
            .filter((p) => !!p.url)
            .map((project) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                subtitle={project.subtitle}
                url={project.url!}
                thumbnailUrl={
                  project.thumbnail
                    ? urlFor(project.thumbnail).url()
                    : undefined
                }
              />
            ))}
        </section>

        <section>
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp._id}
              company={exp.company}
              role={exp.role}
              description={exp.description}
              startDate={exp.startDate}
              endDate={exp.endDate ?? 'Present'}
            />
          ))}
        </section>

        <section>
          {technologies.map((tech) => (
            <TechnologyCard
              key={tech._id}
              name={tech.name}
              iconUrl={tech.icon ? urlFor(tech.icon).url() : undefined}
            />
          ))}
        </section>

        <ContactForm />
      </main>

      {settings?.footerContent && <Footer content={settings.footerContent} />}
    </>
  );
}
