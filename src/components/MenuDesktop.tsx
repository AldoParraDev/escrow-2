"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBuilding, FaFileAlt, FaHome, FaPhoneAlt, FaUniversity } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { useAuthStore } from "@/store/auth.store";

export default function MenuDesktop() {
  const path = usePathname();
  const { userLoggedIn } = useAuthStore();
  const isAdmin = userLoggedIn?.user_role === "admin";

  return (
    <div className="hidden bg-white xl:flex items-center justify-around w-full">
      <Link
        href="/home"
        className={cn(
          "flex items-center gap-2",
          path === "/home" ? "text-primary" : "text-content"
        )}
      >
        <FaHome className="size-5" />
        <span className="text-base font-semibold leading-[1]">Home</span>
      </Link>

      <Link
        href="/properties"
        className={cn(
          "flex items-center gap-2",
          path === "/properties" ? "text-primary" : "text-content"
        )}
      >
        <FaBuilding className="size-5" />
        <span className="text-base font-semibold leading-[1]">Properties</span>
      </Link>

      <Link
        href="/contracts"
        className={cn(
          "flex items-center gap-2",
          path === "/contracts" ? "text-primary" : "text-content"
        )}
      >
        <FaFileAlt className="size-5" />
        <span className="text-base font-semibold leading-[1]">Contracts</span>
      </Link>

      <Link
        href="/escrow"
        className={cn(
          "flex items-center gap-2",
          path === "/escrow" ? "text-primary" : "text-content"
        )}
      >
        <HiCurrencyDollar className="size-5" />
        <span className="text-base font-semibold leading-[1]">Escrow</span>
      </Link>

      {isAdmin && (
        <Link
          href="/bank"
          className={cn(
            "flex items-center gap-2",
            path === "/bank" ? "text-primary" : "text-content"
          )}
        >
          <FaUniversity className="size-5" />
          <span className="text-base font-semibold leading-[1]">Bank</span>
        </Link>
      )}

      <Link
        href="/contacts"
        className={cn(
          "flex items-center gap-2",
          path === "/contacts" ? "text-primary" : "text-content"
        )}
      >
        <FaPhoneAlt className="size-5" />
        <span className="text-base font-semibold leading-[1]">contacts</span>
      </Link>
    </div>
  );
}
