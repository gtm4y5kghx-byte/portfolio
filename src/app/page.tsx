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
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
      <Nav />
      <main className="flex flex-col gap-8">
        {/* Two Column Hero: ProfileCard and BioSection */}
        {profile && (
          <div className="grid grid-cols-[1fr_2fr] gap-8">
            <ProfileCard
              name={profile.name}
              bio={profile.bio}
              photoUrl={profile.photo ? urlFor(profile.photo).url() : undefined}
              socialLinks={profile.socialLinks?.map(({ platform, url }) => ({
                platform,
                url,
              }))}
            />
            {profile.heroDescription && (
              <BioSection
                title={profile.role}
                content={profile.heroDescription}
              />
            )}
          </div>
        )}

        {/* Sections: Projects, Technologies & ContactForm */}
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
    </div>
  );
}
