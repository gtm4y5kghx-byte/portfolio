import SectionHeader from '../sections/SectionHeader';

interface ReferenceSlideProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export default function ReferenceSlide({
  quote,
  author,
  role,
  company,
}: ReferenceSlideProps) {
  return (
    <div className="gap-content flex flex-col">
      <blockquote data-quote>
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <div data-author>
        <p className="text-3xl">{author}</p>
        <p className="text-primary font-bold">
          {role}, {company}
        </p>
      </div>
    </div>
  );
}
