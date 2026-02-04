"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBuilding, FaFileAlt, FaHome, FaPhoneAlt, FaUniversity } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { useAuthStore } from "@/store/auth.store";

export default function MenuMobile() {
  const path = usePathname();
  const { userLoggedIn } = useAuthStore();
  const isAdmin = userLoggedIn?.user_role === "admin";

  return (
    <div className="bg-white border-t flex items-center justify-around fixed bottom-0 w-screen pt-3 pb-3 xl:hidden">
      <Link
        href="/home"
        className={cn(
          "flex flex-col items-center gap-1",
          path === "/home" ? "text-primary" : "text-content"
        )}
      >
        <FaHome className="size-6" />
        <span className="text-xs font-semibold leading-[1]">Home</span>
      </Link>

      <Link
        href="/properties"
        className={cn(
          "flex flex-col items-center gap-1",
          path === "/properties" ? "text-primary" : "text-content"
        )}
      >
        <FaBuilding className="size-6" />
        <span className="text-xs font-semibold leading-[1]">Properties</span>
      </Link>

      <Link
        href="/contracts"
        className={cn(
          "flex flex-col items-center gap-1",
          path === "/contracts" ? "text-primary" : "text-content"
        )}
      >
        <FaFileAlt className="size-6" />
        <span className="text-xs font-semibold leading-[1]">Contracts</span>
      </Link>

      <Link
        href="/escrow"
        className={cn(
          "flex flex-col items-center gap-1",
          path === "/escrow" ? "text-primary" : "text-content"
        )}
      >
        <HiCurrencyDollar className="size-6" />
        <span className="text-xs font-semibold leading-[1]">Escrow</span>
      </Link>

      {isAdmin && (
        <Link
          href="/bank"
          className={cn(
            "flex flex-col items-center gap-1",
            path === "/bank" ? "text-primary" : "text-content"
          )}
        >
          <FaUniversity className="size-6" />
          <span className="text-xs font-semibold leading-[1]">Bank</span>
        </Link>
      )}

      <Link
        href="/contacts"
        className={cn(
          "flex flex-col items-center gap-1",
          path === "/contacts" ? "text-primary" : "text-content"
        )}
      >
        <FaPhoneAlt className="size-6" />
        <span className="text-xs font-semibold leading-[1]">Contacts</span>
      </Link>
    </div>
  );
}
