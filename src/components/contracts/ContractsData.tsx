"use client";

import { ContractsList } from "@/components/contracts/ContractsList";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth.store";
import { Contract } from "@/types/contract";
import { useEffect, useState } from "react";
import { FaFileAlt, FaPlus } from "react-icons/fa";
import Link from "next/link";

export default function ContractsData() {
  const { userLoggedIn } = useAuthStore();
  const [listContracts, setListContracts] = useState<Contract[]>([]);

  let url: string = "";

  if (userLoggedIn?.user_role === "broker") {
    url = "lease_contracts_by_brokers";
  } else if (userLoggedIn?.user_role === "tenant") {
    url = "lease_contracts_by_tenant";
  } else if (userLoggedIn?.user_role === "landlord") {
    url = "lease_contracts_by_landlord";
  }

  const getContracts = async () => {
    const response = await api.get(`/${url}/${userLoggedIn?.user_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setListContracts(response.data);
  };

  useEffect(() => {
    if (userLoggedIn?.user_id) {
      getContracts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoggedIn?.user_id]);
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-primary text-[1.75rem] leading-[1] xl:text-4xl 2xl:text-5xl">
          Contracts
        </h1>
        <span className="flex items-center gap-1 font-medium text-primary/70 text-sm xl:text-lg">
          <FaFileAlt className="size-4 xl:size-6" />
          {listContracts.length} Contracts
        </span>
      </div>

      <ContractsList contracts={listContracts} onLoading={getContracts} />

      <Link
        href="/contracts/new"
        className="bg-primary text-white fixed right-4 bottom-[80px] rounded-full py-2 !px-6 w-auto shadow-[0px_0px_5px_5px_rgba(37,51,131,0.10)] border-none text-base flex items-center gap-2"
      >
        <FaPlus />
        New Contract
      </Link>
    </>
  );
}
