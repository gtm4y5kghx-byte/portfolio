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
import SectionHeader from '@/components/sections/SectionHeader';

export default async function Home() {
  const [profile, projects, experiences, technologies, settings] =
    await Promise.all([
      getProfile(),
      getProjects(),
      getExperiences(),
      getTechnologies(),
      getSettings(),
    ]);

  const publishedProjects = projects.filter((p) => !!p.url);

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
              photoUrl={
                profile.photo
                  ? urlFor(profile.photo)
                      .width(416)
                      .format('webp')
                      .quality(80)
                      .url()
                  : undefined
              }
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

        {publishedProjects.length > 0 && (
          <section
            className="gap-content flex flex-col"
            aria-labelledby="projects-heading"
          >
            <SectionHeader
              text="Recent Projects"
              id="projects-heading"
              as="h2"
            />
            <div className="grid grid-cols-2 gap-8">
              {publishedProjects.map((project) => (
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
            </div>
          </section>
        )}

        {experiences.length > 0 && (
          <section aria-labelledby="experience-heading">
            <h2 id="experience-heading">Work Experience</h2>
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
        )}

        {technologies.length > 0 && (
          <section aria-labelledby="languages-heading">
            <h2 id="languages-heading">Languages</h2>
            {technologies.map((tech) => (
              <TechnologyCard
                key={tech._id}
                name={tech.name}
                iconUrl={tech.icon ? urlFor(tech.icon).url() : undefined}
              />
            ))}
          </section>
        )}

        <ContactForm />
      </main>

      {settings?.footerContent && <Footer content={settings.footerContent} />}
    </div>
  );
}
