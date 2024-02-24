import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-yellow-500 text-white">
      <div className="w-fit mx-auto px-10 py-4 rounded-sm">
        <div className="flex justify-center items-center">
          <div className="text-lg">
            <Link to="/" className="mr-6 hover:text-yellow-500 hover:underline">
              Planets
            </Link>
            <Link
              to="/residents"
              className="mr-6 hover:text-yellow-500 hover:underline"
            >
              Residents
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
