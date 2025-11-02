import React from "react";
import Image from "next/image";
import { auth, signOut, signIn } from "../../../lib/auth";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";

const Header: React.FC = async () => {
  const session = await auth();
  return (
    <header className="header">
      <nav className="header_nav">
        <div className="header_container">
          <a href="" className="header_logo">
            <Image width={40} height={40} alt="logo" src="/images/logo.png" />
          </a>

          <ul className="header_links">
            <li>
              <a href="">Schemas</a>
            </li>
            <li>
              <a href="">Documentation</a>
            </li>
          </ul>

          <div className="header_auth">
            {session && session?.user ? (
              <>
                <Link href={`/user/${session?.id}`}>Profile</Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button type="submit" className="button_normal bg-slate-100">
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <form
                  action={async () => {
                    "use server";
                    await signIn("google");
                  }}
                >
                  <button
                    type="submit"
                    className="button_normal bg-slate-100 w-full"
                  >
                    Sign In
                  </button>
                </form>
                <Link href="" className="button_normal bg-blue-500 text-white">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
