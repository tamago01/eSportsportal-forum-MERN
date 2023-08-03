import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col text-xs bg-white shadow-lg dark:bg-slate-700 p-4 rounded-lg">
      <div className="grid grid-cols-2 gap-2 justify-between border-b-2 py-2 px-1">
        <p className="cursor-pointer">User Agreement</p>
        <p className="cursor-pointer">Content Policy</p>
        <p className="cursor-pointer">Privacy Policy</p>
        <p className="cursor-pointer">Moderator Code of Conduct</p>
      </div>
      <div className="grid grid-cols-2 gap-2 justify-between border-b-2 py-2 px-1">
        <p className="cursor-pointer">English</p>
        <p className="cursor-pointer">Nepali</p>
        <p className="cursor-pointer">Newari</p>
        <p className="cursor-pointer">Tamang</p>
        <p className="cursor-pointer">Hindi</p>
        <p className="cursor-pointer">Lama</p>
      </div>
      <div className="py-2">
        <p>eSportsPortal @2023. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
