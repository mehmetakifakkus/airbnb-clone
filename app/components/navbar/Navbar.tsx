"use client";

import { SessionProvider } from "next-auth/react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

function Navbar() {
  return (
    <div className="fixed w-full bg-white shadow-sm">
      <div className="py-4 border-b-[1px]">
        <SessionProvider>
          <Container>
            <div className="flex items-center justify-between gap-3 md:g-0">
              <Logo />
              <Search />
              <UserMenu />
            </div>
          </Container>
        </SessionProvider>
      </div>
      <Categories />
    </div>
  );
}

export default Navbar;
