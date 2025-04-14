type Props = {
  children: React.ReactNode;
  className?: string; // for background-color or custom styling
};

export default function SectionWrapper({ children, className = '' }: Props) {
  return (
    <section className={`w-full ${className}`}>
      <div className="page-width">
        {children}
      </div>
    </section>
  );
}
