import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="flex justify-center items-center fixed bottom-0 left-0 right-0">
      <span className="mr-1 text-xl font-bold">
        {"<"}
        {"/"}
        {">"}
      </span>
      <p className="font-bold">
        Developed by {" "}
        <a 
          href="https://github.com/Amayuru1999" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-1"
        >
          Developer AMU - EFAC RUHUNA 🥷
        </a>
      </p>
    </div>
  );
};

export default Footer;
