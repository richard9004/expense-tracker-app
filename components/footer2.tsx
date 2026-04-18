import { cn } from "@/lib/utils";

interface Footer2Props {
  className?: string;
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  className,
  copyright = "(c) 2026 Expense Tracker. All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <footer>
          <div className="flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
