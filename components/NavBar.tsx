"use client";
import * as React from "react";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import BalletWearLogo from "./BalletWearLogo";
import { usePathname } from "next/navigation";

interface INavBarProps {
  user: any;
}

const NavBar: React.FunctionComponent<INavBarProps> = async ({ user }) => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex flex-col justify-center border-b border-b-foreground/10 h-32s">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
        <BalletWearLogo />
        {user ? (
          <div className="flex items-center gap-4">
            Hey, {user.email}!
            <LogoutButton />
          </div>
        ) : (
          <Link
            href="/login"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Login
          </Link>
        )}
      </div>
      <div className="w-full max-w-4xl flex gap-8 items-center p-3 pb-0 text-sm text-foreground font-['Playfair leading-[normal] font-bold ">
        <div
          className={`flex-shrink-0 w-13 h-8 text-center ${
            pathname === "/shop" ? "active-tab" : ""
          }`}
        >
          <Link
            href="/shop"
            className="w-12 text-white font-['Playfair font-bold"
          >
            쇼핑몰
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
