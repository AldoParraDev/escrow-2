"use client";

import { BsFileMedicalFill, BsLightningChargeFill } from "react-icons/bs";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { ImLibrary } from "react-icons/im";
import { Input } from "../ui/input";
import { LuDollarSign } from "react-icons/lu";
import { IoCard } from "react-icons/io5";
import { useNewContractStore } from "@/store/new-contract.store";
import { useState } from "react"; // Importamos useState para manejar el estado local

import { Switch } from "../ui/switch";
import { FaStar } from "react-icons/fa";
import { IoIosCalendar } from "react-icons/io";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { enUS } from "date-fns/locale";

export default function AdditionalTermsForm() {
  const {
    utilitiesExeption,
    associationDeposit,
    associationFees,
    associationAppDue,
    tenantPaysAssociationFee,
    serviceMemberTenant,
    maintenanceException,
    additionalTerms,
    setUtilitiesExeption,
    setAssociationDeposit,
    setAssociationFees,
    setAssociationAppDue,
    setTenantPaysAssociationFee,
    setServiceMemberTenant,
    setMaintenanceException,
    setAdditionalTerms,
  } = useNewContractStore();

  // Estados locales para manejar el valor temporal durante la edición
  const [tempAssociationDeposit, setTempAssociationDeposit] = useState(
    associationDeposit.toString()
  );
  const [tempAssociationFees, setTempAssociationFees] = useState(
    associationFees.toString()
  );

  const [isAssociationDepositFocused, setIsAssociationDepositFocused] =
    useState(false);
  const [isAssociationFeesFocused, setIsAssociationFeesFocused] =
    useState(false);

  // Manejadores para Association Deposit
  const handleAssociationDepositFocus = () => {
    setIsAssociationDepositFocused(true);
    if (associationDeposit === 0) {
      setTempAssociationDeposit("");
    }
  };

  const handleAssociationDepositBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    setIsAssociationDepositFocused(false);
    const value = e.target.value;

    if (value === "") {
      setAssociationDeposit(0);
      setTempAssociationDeposit("0");
    } else {
      const numValue = Number(value);
      setAssociationDeposit(numValue);
      setTempAssociationDeposit(numValue.toString());
    }
  };

  const handleAssociationDepositChange = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTempAssociationDeposit(value);
    }
  };

  // Manejadores para Association Fees
  const handleAssociationFeesFocus = () => {
    setIsAssociationFeesFocused(true);
    if (associationFees === 0) {
      setTempAssociationFees("");
    }
  };

  const handleAssociationFeesBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsAssociationFeesFocused(false);
    const value = e.target.value;

    if (value === "") {
      setAssociationFees(0);
      setTempAssociationFees("0");
    } else {
      const numValue = Number(value);
      setAssociationFees(numValue);
      setTempAssociationFees(numValue.toString());
    }
  };

  const handleAssociationFeesChange = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTempAssociationFees(value);
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-310px)] w-full">
      <div className="mb-2 flex items-center gap-3">
        <p className="font-medium leading-[1] text-primary text-sm">
          Step 4 of 4
        </p>
        <span className="text-xs text-content">
          Additional Terms
        </span>
      </div>
      <div className="w-full flex flex-col gap-2 ">
        <div className="flex items-center justify-start gap-4">
          <BsFileMedicalFill className="text-primary size-6" />
          <div className="flex flex-col items-start gap-0 leading-[1]">
            <h2 className="font-bold text-primary text-2xl">
              Additional Terms
            </h2>
            <p className="text-content text-sm">Final contract details</p>
          </div>
        </div>

        <div className="w-full p-4 bg-white border rounded-xl flex flex-col gap-6 mb-50">
          <h2 className="font-bold text-yellow-400 text-lg flex items-center gap-2">
            <BsFileMedicalFill className="text-yellow-400 size-6" />
            Utilities & Services
          </h2>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <BsLightningChargeFill className="text-primary/80" />
              Utilities Landlord Will Pay
            </label>
            <Textarea
              placeholder="e.g., Water, Sewer, Electricity..."
              className="h-26 placeholder:text-content/60"
              value={utilitiesExeption}
              onChange={(e) => setUtilitiesExeption(e.target.value)}
            />
          </div>

          <h2 className="font-bold text-cyan-600 text-lg flex items-center gap-2">
            <ImLibrary className="text-cyan-600 size-6" />
            Association Details
          </h2>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <ImLibrary className="text-primary/80" />
              Association Deposit
            </label>
            <div className="relative">
              <Input
                className="peer ps-9 h-12"
                placeholder="0.00"
                type="text"
                inputMode="decimal"
                value={
                  isAssociationDepositFocused
                    ? tempAssociationDeposit
                    : associationDeposit === 0
                      ? ""
                      : associationDeposit.toString()
                }
                onChange={handleAssociationDepositChange}
                onFocus={handleAssociationDepositFocus}
                onBlur={handleAssociationDepositBlur}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <LuDollarSign size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <IoCard className="text-primary/80" />
              Association Fees
            </label>
            <div className="relative">
              <Input
                className="peer ps-9 h-12"
                placeholder="0.00"
                type="text"
                inputMode="decimal"
                value={
                  isAssociationFeesFocused
                    ? tempAssociationFees
                    : associationFees === 0
                      ? ""
                      : associationFees.toString()
                }
                onChange={handleAssociationFeesChange}
                onFocus={handleAssociationFeesFocus}
                onBlur={handleAssociationFeesBlur}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <LuDollarSign size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <IoIosCalendar className="text-primary/80" />
              Association application due date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!associationAppDue}
                  className="data-[empty=true]:text-muted-foreground w-full h-12 justify-start text-left font-normal"
                >
                  {associationAppDue ? (
                    <span className="truncate">
                      {format(associationAppDue, "MMM d, yyyy", {
                        locale: enUS,
                      })}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-base font-normal">
                      Pick a date
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 ">
                <Calendar
                  mode="single"
                  selected={associationAppDue}
                  onSelect={setAssociationAppDue}
                  required
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-between border rounded-xl p-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <IoCard className="size-6 text-blue-400" />
                <h3 className="font-bold text-black">
                  Tenant Pays Association Fee
                </h3>
              </div>
              <p className="font-light text-content text-sm">
                Will tenant pay association fees?
              </p>
            </div>

            <Switch
              checked={tenantPaysAssociationFee}
              onCheckedChange={setTenantPaysAssociationFee}
            />
          </div>

          <h2 className="font-bold text-yellow-400 text-lg flex items-center gap-2">
            <BsFileMedicalFill className="text-yellow-400 size-6" />
            Special Terms
          </h2>

          <div className="flex items-center justify-between border rounded-xl p-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <FaStar className="size-6 text-blue-400" />
                <h3 className="font-bold text-black">Service Member Tenant</h3>
              </div>
              <p className="font-light text-content text-sm">
                Is the tenant a service member?
              </p>
            </div>

            <Switch
              checked={serviceMemberTenant}
              onCheckedChange={setServiceMemberTenant}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <BsLightningChargeFill className="text-primary/80" />
              Maintenance Exceptions
            </label>
            <Textarea
              placeholder="Any maintenance exceptions or special terms..."
              className="h-26 placeholder:text-content/60"
              value={maintenanceException}
              onChange={(e) => setMaintenanceException(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <BsLightningChargeFill className="text-primary/80" />
              Additional Terms
            </label>
            <Textarea
              placeholder="Enter any additional terms outside of utilities and maintenance..."
              className="h-26 placeholder:text-content/60"
              value={additionalTerms}
              onChange={(e) => setAdditionalTerms(e.target.value)}
            />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
