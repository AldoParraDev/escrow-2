"use client";

import api from "@/lib/axios";
import { formatToShortDate } from "@/lib/utils";
import { Contract } from "@/types/contract";
import { UserData } from "@/types/user";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { LuCalendar, LuCalendarClock } from "react-icons/lu";
import { PiUserCircleFill, PiUserCirclePlusFill } from "react-icons/pi";

interface Props {
  contract: Contract;
  handleContractSelected: (contract: Contract) => void;
}

export default function ContractCard({
  contract,
  handleContractSelected,
}: Props) {
  const [listUsers, setListUsers] = useState<UserData[]>([]);
  const handleGetUsers = async () => {
    const response = await api.get("/users", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setListUsers(response.data);
    } else {
      console.log(response);
      setListUsers([]);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);
  return (
    <div
      className="w-full border rounded-xl bg-white px-2 !py-4 flex flex-col gap-3 relative shadow-[24px_20px_135px_-31px_rgba(37,51,131,0.30)]"
      onClick={() => handleContractSelected(contract)}
    >
      <div className="w-full flex items-start justify-between px-2">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-primary font-bold text-xl xl:text-2xl">
            Contract #{contract.lease_id}
          </h2>
          <span className="text-content text-base font-medium leading-[1] xl:text-lg">
            Property # {contract.property_id}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-1 px-2 py-1 border rounded-2xl bg-content/20 text-content">
            <FaRegCircle className="size-3 zl:size-4" />
            <span className="leading-[1] text-xs capitalize xl:text-sm">
              {contract.lease_status}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <b className="text-primary font-bold text-xl xl:text-3xl">
              ${contract.lease_monthly_rent}
            </b>
            <span className="text-xs text-content font-normal">per month</span>
          </div>
        </div>
      </div>

      <div className="w-full px-3 py-3 bg-primary/10 rounded-2xl flex items-start justify-start gap-10 xl:gap-15">
        <div className="flex flex-col gap-1 items-start leading-[1]">
          <span className="flex gap-1 items-center text-sm text-content xl:text-lg">
            <PiUserCircleFill className="text-blue-500 size-4 xl:size-5" />{" "}
            Landlord
          </span>
          <span className="font-medium xl:text-lg">
            {
              listUsers.find((user) => user.user_id === contract.landlord_id)
                ?.user_first_name
            }{" "}
            {
              listUsers.find((user) => user.user_id === contract.landlord_id)
                ?.user_last_name
            }
          </span>
        </div>

        <div className="flex flex-col gap-1 items-start leading-[1]">
          <span className="flex gap-1 items-center text-sm text-content xl:text-lg">
            <PiUserCirclePlusFill className="text-green-500 size-4 xl:size-5" />{" "}
            Tenant
          </span>
          <span className="font-medium xl:text-lg">
            {
              listUsers.find((user) => user.user_id === contract.tenant_id)
                ?.user_first_name
            }{" "}
            {
              listUsers.find((user) => user.user_id === contract.tenant_id)
                ?.user_last_name
            }
          </span>
        </div>
      </div>

      <div className="w-full flex items-start justify-between px-2">
        <div className="flex flex-col items-start">
          <span className="flex gap-2 items-center text-xs text-content xl:text-lg">
            <LuCalendar className="text-primary" /> Start Date
          </span>
          <b className="text-[0.925rem] xl:text-lg">
            {formatToShortDate(contract.lease_start_date)}
          </b>
        </div>
        <div className="flex flex-col items-start">
          <span className="flex gap-2 items-center text-xs text-content xl:text-lg">
            <LuCalendarClock className="text-primary" /> End Date
          </span>
          <b className="text-[0.925rem] xl:text-lg">
            {formatToShortDate(contract.lease_end_date)}
          </b>
        </div>
        <div className="flex flex-col items-start">
          <span className="flex gap-2 items-center text-xs text-content xl:text-lg">
            <LuCalendarClock className="text-content" /> Due Day
          </span>
          <b className="text-[0.925rem] xl:text-lg">{contract.lease_day_of_month || "-"}</b>
        </div>
      </div>

      <div className="w-full items-center justify-end hidden">
        <span className="text-primary/60">
          <ChevronRight />
        </span>
      </div>
    </div>
  );
}
