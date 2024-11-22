import SearchInput from "./SearchInput";

function Header() {
  const keyframes = `
    @keyframes revealLetter {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  // Total animation duration for all letters
  const totalDuration = 5; // Adjust as needed (in seconds)
  const letterDelay = 0.1; // Delay between letters

  return (
    <header
      className="relative"
      style={{
        backgroundColor: "#101820",
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
          className="w-72 h-72 opacity-10 rounded-full blur-2xl absolute -top-12 -left-12"
          style={{ backgroundColor: "#FEE715" }}
        ></div>
        <div
          className="w-72 h-72 opacity-10 rounded-full blur-2xl absolute top-16 right-16"
          style={{ backgroundColor: "#FEE715" }}
        ></div>
      </div>

      {/* Animated Tagline */}
      <div className="relative z-10 p-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-wider text-white">
          {Array.from("Discover Movies Tailored Just for You").map((char, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                animation: `revealLetter 2s ease-in-out ${index * letterDelay}s forwards`,
                opacity: 0,
              }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p
          className="mt-2 text-lg font-medium opacity-90"
          style={{
            color: "#FEE715",
            animation: `fadeIn ${totalDuration}s ease-in-out infinite`,
            animationDelay: `${(Array.from("Discover Movies Tailored Just for You").length *
              letterDelay).toFixed(2)}s`, // Starts after all letters are revealed
          }}
        >
          Your Next Favorite Awaits!
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 mt-8 mb-4 p-4">
        <SearchInput />
      </div>
    </header>
  );
}

export default Header;
