import {
  getProfile,
  getProjects,
  getExperiences,
  getTechnologies,
  getSettings,
} from '@/lib/sanity/services';
import { urlFor } from '@/lib/sanity/image';
import Nav from '@/components/sections/Nav';
import { SocialLinks } from '@/components/sections/Hero';
import RichText from '@/components/ui/RichText';
import ProjectCard from '@/components/ui/ProjectCard';
import ExperienceCard from '@/components/ui/ExperienceCard';
import TechnologyCard from '@/components/ui/TechnologyCard';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/sections/Footer';
import SectionHeader from '@/components/sections/SectionHeader';
import ScrollReveal from '@/components/animations/SrollReveal';

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
    <div className="mx-auto flex w-full flex-col gap-8 px-4 py-8 md:max-w-5xl">
      <Nav />
      <main className="flex flex-col gap-8">
        {profile && (
          <section className="flex flex-col gap-4">
            <ScrollReveal trigger="load" direction="up">
              <SectionHeader text={profile.name} id="hero-heading" />
            </ScrollReveal>
            <ScrollReveal trigger="load" delay={0.15} direction="up">
              <div className="max-w-2xl">
                <RichText value={profile.bio} />
              </div>
            </ScrollReveal>
            <ScrollReveal trigger="load" delay={0.3} stagger={0.08} direction="up">
              <SocialLinks socialLinks={profile.socialLinks} email={profile.email} />
            </ScrollReveal>
          </section>
        )}

        {/* Sections: Projects, Technologies & ContactForm */}

        {projects.length > 0 && (
          <section
            className="gap-content flex flex-col"
            aria-labelledby="projects-heading"
          >
            <ScrollReveal>
              <SectionHeader
                text="Recent Projects"
                id="projects-heading"
                as="h2"
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.1} start="top 90%">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    subtitle={project.subtitle}
                    url={project.url}
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
            </ScrollReveal>
          </section>
        )}

        {experiences.length > 0 && (
          <section
            className="gap-content flex w-full flex-col md:max-w-3xl"
            aria-labelledby="experience-heading"
          >
            <ScrollReveal>
              <SectionHeader
                text="Work Experience"
                id="experience-heading"
                as="h2"
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.12}>
              <div className="divide-y divide-white/10">
                {experiences.map((exp) => (
                  <ExperienceCard
                    key={exp._id}
                    company={exp.company}
                    role={exp.role}
                    description={exp.description}
                    startDate={exp.startDate}
                    endDate={exp.endDate}
                  />
                ))}
              </div>
            </ScrollReveal>
          </section>
        )}

        {technologies.length > 0 && (
          <section
            className="gap-content flex w-full flex-col md:max-w-3xl"
            aria-labelledby="technologies-heading"
          >
            <ScrollReveal>
              <SectionHeader
                text="Technologies"
                id="technologies-heading"
                as="h2"
              />
            </ScrollReveal>

            <ScrollReveal stagger={0.05}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {technologies.map((tech) => (
                  <TechnologyCard key={tech._id} name={tech.name} />
                ))}
              </div>
            </ScrollReveal>
          </section>
        )}

        <section
          className="gap-content flex w-full flex-col md:max-w-3xl"
          aria-labelledby="get-in-touch-heading"
        >
          <ScrollReveal>
            <SectionHeader
              text="Get in Touch"
              id="get-in-touch-heading"
              as="h2"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ContactForm />
          </ScrollReveal>
        </section>
      </main>

      {settings && <Footer content={settings.footerContent} />}
    </div>
  );
}
