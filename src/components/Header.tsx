import React from "react";

import toDoLogo from "../assets/img/icons/app_logo.svg";

export const Header = () => {
  return (
    <header className="bg-base-gray-700 flex items-center justify-center gap-2 pt-11 pb-12">
      <div>
        <img className="pt-2" src={toDoLogo} alt="Company logo" />
      </div>
      <h1 className="text-4xl font-bold">
        <span className="text-product-blue">to</span>
        <span className="text-product-purple">do</span>
      </h1>
    </header>
  );
};
