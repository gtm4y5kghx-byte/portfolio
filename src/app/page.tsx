export const revalidate = 60;

import {
  getProfile,
  getProjects,
  getExperiences,
  getTechnologies,
  getTestimonials,
  getSettings,
} from '@/lib/sanity/services';
import { urlFor } from '@/lib/sanity/image';
import Nav from '@/components/sections/Nav';
import { SocialLinks } from '@/components/sections/Hero';
import RichText from '@/components/ui/RichText';
import ProjectCard from '@/components/ui/ProjectCard';
import ExperienceCard from '@/components/ui/ExperienceCard';
import TechnologyCard from '@/components/ui/TechnologyCard';
import ReferenceCarousel from '@/components/ui/ReferenceCarousel';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/sections/Footer';
import SectionHeader from '@/components/sections/SectionHeader';
import ScrollReveal from '@/components/animations/SrollReveal';

export default async function Home() {
  const [profile, projects, experiences, technologies, testimonials, settings] =
    await Promise.all([
      getProfile(),
      getProjects(),
      getExperiences(),
      getTechnologies(),
      getTestimonials(),
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
            <ScrollReveal
              trigger="load"
              delay={0.3}
              stagger={0.08}
              direction="up"
            >
              <SocialLinks
                socialLinks={profile.socialLinks}
                email={profile.email}
              />
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
                text="Projects"
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
                    slug={project.slug.current}
                    subtitle={project.subtitle}
                    displayMode={project.displayMode}
                    imageUrl={
                      project.projectImage
                        ? urlFor(project.projectImage)
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

        {testimonials.length > 0 && (
          <section
            className="gap-content flex w-full flex-col md:max-w-3xl"
            aria-labelledby="references-heading"
          >
            <ScrollReveal>
              <SectionHeader
                text="What People Say"
                id="references-heading"
                as="h2"
              />
            </ScrollReveal>

            <ScrollReveal>
              <ReferenceCarousel testimonials={testimonials} />
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
