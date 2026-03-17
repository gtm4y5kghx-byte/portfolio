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
        <p className="text-lg">&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <div data-author>
        <p className="text-md">{author}</p>
        <p className="text-primary text-sm font-bold">
          {role}, {company}
        </p>
      </div>
    </div>
  );
}
