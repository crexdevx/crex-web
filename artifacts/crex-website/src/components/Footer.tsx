export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#portfolio" },
    { name: "Why Us", href: "#why-us" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-12 px-6 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <img
            src="/logo.png"
            alt="Crex"
            className="h-10 w-auto object-contain"
            style={{ mixBlendMode: "screen" }}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm text-gray-500 hover:text-white transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-end gap-1">
          <a
            href="mailto:crexdevweb@gmail.com"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            crexdevweb@gmail.com
          </a>
          <div className="text-sm text-gray-600">
            © {currentYear} Crex. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
