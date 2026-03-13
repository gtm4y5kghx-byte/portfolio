import {
  getProfile,
  getProjects,
  getExperiences,
  getTechnologies,
  getSettings,
} from '@/lib/sanity/services';
import { urlFor } from '@/lib/sanity/image';
import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
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
        {profile && (
          <Hero
            name={profile.name}
            bio={profile.bio}
            socialLinks={profile.socialLinks?.map(({ platform, url }) => ({
              platform,
              url,
            }))}
          />
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
                      ? urlFor(project.thumbnail)
                          .width(960)
                          .format('webp')
                          .quality(80)
                          .url()
                      : undefined
                  }
                />
              ))}
            </div>
          </section>
        )}

        {experiences.length > 0 && (
          <section
            className="gap-content flex max-w-3xl flex-col"
            aria-labelledby="experience-heading"
          >
            <SectionHeader
              text="Work Experience"
              id="experience-heading"
              as="h2"
            />
            <div className="divide-y divide-white/10">
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
            </div>
          </section>
        )}

        {technologies.length > 0 && (
          <section
            className="gap-content flex max-w-3xl flex-col"
            aria-labelledby="technologies-heading"
          >
            <SectionHeader
              text="Technologies"
              id="technologies-heading"
              as="h2"
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {technologies.map((tech) => (
                <TechnologyCard key={tech._id} name={tech.name} />
              ))}
            </div>
          </section>
        )}

        <ContactForm />
      </main>

      {settings?.footerContent && <Footer content={settings.footerContent} />}
    </div>
  );
}
