"use client";

import { FaRegBuilding, FaUsers } from "react-icons/fa";
import { HiCurrencyDollar, HiInformationCircle } from "react-icons/hi2";
import { Input } from "../ui/input";
import { GrTextAlignLeft } from "react-icons/gr";
import { Textarea } from "../ui/textarea";
import { AiOutlineDollar } from "react-icons/ai";
import { LuDollarSign } from "react-icons/lu";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { UserData } from "@/types/user";
import api from "@/lib/axios";
import { PiUserCircleFill, PiUserCirclePlusFill } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfoFormData } from "./EditProperty";

interface Props {
  infoData: InfoFormData;
  setInfoData: React.Dispatch<React.SetStateAction<InfoFormData>>;
}

export default function InfoForm({ infoData, setInfoData }: Props) {
  const [isMonthlyRentFocused, setIsMonthlyRentFocused] = useState(false);
  const [tempMonthlyRent, setTempMonthlyRent] = useState(
    infoData.monthlyRent === 0 ? "" : infoData.monthlyRent.toString()
  );

  const handleMonthlyRentFocus = () => {
    setIsMonthlyRentFocused(true);
    if (infoData.monthlyRent === 0) {
      setTempMonthlyRent("");
    }
  };

  const handleMonthlyRentBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsMonthlyRentFocused(false);
    const value = e.target.value;

    if (value === "") {
      handleChange("monthlyRent", 0);
      setTempMonthlyRent("0");
    } else {
      const numValue = Number(value);
      handleChange("monthlyRent", numValue);
      setTempMonthlyRent(numValue.toString());
    }
  };

  const handleMonthlyRentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTempMonthlyRent(value);
    }
  };
  const handleChange = (field: keyof InfoFormData, value: string | number) => {
    setInfoData((prev: InfoFormData) => ({
      ...prev,
      [field]: value,
    }));
  };

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
  }, [infoData.brokerId, infoData.landlordId, infoData.tenantId]);
  return (
    <ScrollArea className="h-[calc(100vh-210px)] w-full">
      <div className="grid grid-cols-1 gap-4 w-full">
        {/* BASIC INFORMATION */}
        <div className="w-full rounded-b-xl bg-white p-5 flex flex-col gap-4 border border-t-0">
          <h2 className="flex items-center gap-2 text-primary font-bold text-lg">
            <HiInformationCircle className="size-6" />
            Basic Information
          </h2>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <FaRegBuilding className="text-primary/80" />
              Property Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g., Sunset Apartments"
              className="h-12 placeholder:text-content/60"
              value={infoData.propertyName}
              onChange={(e) => handleChange("propertyName", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <GrTextAlignLeft className="text-primary/80" />
              Description
            </label>
            <Textarea
              placeholder="Enter property description..."
              className="h-30 placeholder:text-content/60"
              value={infoData.propertyDescription}
              onChange={(e) =>
                handleChange("propertyDescription", e.target.value)
              }
            />
          </div>
        </div>

        {/* FINANCIAL DETAILS */}
        <div className="w-full rounded-xl bg-white p-5 flex flex-col gap-4 border">
          <h2 className="flex items-center gap-2 text-green-500 font-bold text-lg">
            <HiCurrencyDollar className="size-6" />
            Financial Details
          </h2>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <AiOutlineDollar className="text-primary/80" />
              Monthly Rent *
            </label>
            <div className="relative">
              <Input
                className="peer ps-9 h-12"
                placeholder="0.00"
                type="text" // usar text para controlar el formato
                inputMode="decimal"
                value={
                  isMonthlyRentFocused
                    ? tempMonthlyRent
                    : infoData.monthlyRent === 0
                      ? ""
                      : infoData.monthlyRent.toString()
                }
                onChange={handleMonthlyRentChange}
                onFocus={handleMonthlyRentFocus}
                onBlur={handleMonthlyRentBlur}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <LuDollarSign size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* parties */}
        <div className="w-full rounded-xl bg-white p-5 flex flex-col gap-4 border">
          <h2 className="flex items-center gap-2 text-blue-500 font-bold text-lg">
            <FaUsers className="size-6" />
            Parties
          </h2>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <PiUserCircleFill className="text-primary/80" />
              Landlord *
            </label>
            <Select
              value={infoData.landlordId}
              onValueChange={(value) => handleChange("landlordId", value)}
            >
              <SelectTrigger className="w-full !h-12">
                <SelectValue placeholder="Select Landlord" />
              </SelectTrigger>
              <SelectContent>
                {listUsers
                  .filter((user) => user.user_role === "landlord")
                  .map((user) => (
                    <SelectItem
                      key={user.user_id}
                      value={String(user.user_id)}
                      className="capitalize"
                    >
                      {user.user_first_name} {user.user_last_name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-col gap-1 hidden">
            <label className="flex items-center gap-2 text-content font-normal">
              <PiUserCirclePlusFill className="text-primary/80" />
              Tenant *
            </label>
            <Select
              value={infoData.tenantId}
              onValueChange={(value) => handleChange("tenantId", value)}
            >
              <SelectTrigger className="w-full !h-12">
                <SelectValue placeholder="Select Tenant" />
              </SelectTrigger>
              <SelectContent>
                {listUsers
                  .filter((user) => user.user_role === "tenant")
                  .map((user) => (
                    <SelectItem
                      key={user.user_id}
                      value={String(user.user_id)}
                      className="capitalize"
                    >
                      {user.user_first_name} {user.user_last_name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <PiUserCirclePlusFill className="text-primary/80" />
              Broker *
            </label>
            <Select
              value={infoData.brokerId}
              onValueChange={(value) => handleChange("brokerId", value)}
            >
              <SelectTrigger className="w-full !h-12">
                <SelectValue placeholder="Select Broker" />
              </SelectTrigger>
              <SelectContent>
                {listUsers
                  .filter((user) => user.user_role === "broker")
                  .map((user) => (
                    <SelectItem
                      key={user.user_id}
                      value={String(user.user_id)}
                      className="capitalize"
                    >
                      {user.user_first_name} {user.user_last_name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
