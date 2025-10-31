import React from "react";
import Link from "next/link";

const MainPage = () => {
  return (
    <div className="main_page screen-header-h-sum img-background">
      <div className="main_page_buttons">
        <Link href="/" className="button_normal bg-slate-100">
          Load Schema
        </Link>

        <Link href="/editor" className="button_normal bg-blue-500 text-white">
          Create Schema
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
