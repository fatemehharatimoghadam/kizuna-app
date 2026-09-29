import SearchBox from "../search/SearchBox";

import heroImage from "../../assets/brand/kizuna-hero.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-background">
      {/* Hero artwork */}
      <div
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
        aria-hidden="true"
      />

      {/* Keep the text area dark while preserving the artwork on the right */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-transparent"
        aria-hidden="true"
      />

      {/* Bottom fade into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      {/* Soft orange atmospheric glow */}
      <div
        className="absolute right-[15%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-6">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Manga Discovery
          </p>

          <h1 className="max-w-xl text-5xl font-bold leading-[1.08] tracking-tight text-foreground drop-shadow-lg sm:text-6xl">
            Discover stories
            <br />
            beyond worlds.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/75 drop-shadow-md">
            Explore manga, discover new worlds, and find the stories
            that connect with you.
          </p>

          <div className="mt-8 max-w-xl">
            <SearchBox />
          </div>
        </div>
      </div>
    </section>
  );
}