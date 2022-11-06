import Link from "next/link";
import React from "react";

/**This is a header compononent that will render generally in all pages */

const Header = () => {
  return (
    <header className="p-5 bg-blue-400 text-white">
      <Link href={"/"} className="px-2 py-1 bg-white text-blue-400 rounded-md">
        Home
      </Link>
    </header>
  );
};

export default Header;
