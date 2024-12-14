import SearchInput from "./SearchInput";

function Header() {
  const keyframes = `
    @keyframes revealLetter {
      0% {
        opacity: 0;
        transform: translateY(-20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  const letterDelay = 0.1; // Delay between letters

  return (
    <header
      className="relative text-white"
      style={{
        background: "linear-gradient(135deg, #101820 60%, #36454F)",
        color: "#FEE715",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Inline Keyframes */}
      <style>{keyframes}</style>

      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div
          className="w-72 h-72 opacity-20 rounded-full blur-3xl absolute -top-8 -left-8"
          style={{ backgroundColor: "#FEE715" }}
        ></div>
        <div
          className="w-72 h-72 opacity-20 rounded-full blur-3xl absolute top-16 right-16"
          style={{ backgroundColor: "#FEE715" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-10 text-center">
        {/* Tagline */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
          {Array.from("Discover Movies Tailored Just for You").map((char, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                animation: `revealLetter 1.5s ease-in-out ${index * letterDelay}s forwards`,
                opacity: 0,
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <div
          className="mt-2 text-base md:text-lg font-medium"
          style={{
            color: "#FEE715",
            animation: `fadeIn 2s ease-in-out 2s forwards`,
            opacity: 0,
          }}
        >
          <p>Your Next Favorite Awaits! 10,000+ movies</p>
          <p>Please wait if the site hangs; it will recover soon.</p>
        </div>

        {/* Search Bar */}
        <div className="relative z-10 mt-4">
          <SearchInput />
        </div>
        <p className="text-2xl mt-2 text-white-800">Search for a movie to discover recommendations.</p>
      </div>

      {/* Decorative Footer Curve */}
      <div
        className="absolute bottom-0 left-0 w-full h-8"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #101820 100%)",
        }}
      ></div>
    </header>
  );
}

export default Header;
