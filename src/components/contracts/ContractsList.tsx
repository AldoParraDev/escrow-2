"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Building2Icon,
  CalendarIcon,
  ChevronLeft,
  HomeIcon,
  Search,
  ShieldIcon,
  UserCheck2,
  UserPlusIcon,
  X,
} from "lucide-react";
import { Input } from "../ui/input";
import ContractCard from "./ContractCard";
import { Contract } from "@/types/contract";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { cn, formatToShortDate } from "@/lib/utils";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaExclamation,
  FaFlag,
  FaHandPaper,
  FaMoneyBill,
  FaSignature,
} from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { BsExclamationCircle } from "react-icons/bs";
import { IoIosCalendar } from "react-icons/io";
import { RiArmchairFill } from "react-icons/ri";
import { PiSigmaBold } from "react-icons/pi";
import { MdOutlinePets } from "react-icons/md";
import api from "@/lib/axios";

interface ContractsListProps {
  contracts: Contract[];
}

export function ContractsList({ contracts }: ContractsListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContracts = useMemo(() => {
    if (!searchTerm.trim()) return contracts;

    return contracts.filter((contract) => {
      const searchLower = searchTerm.toLowerCase();
      return contract.lease_status?.toLowerCase().includes(searchLower);
    });
  }, [contracts, searchTerm]);

  const clearSearch = () => setSearchTerm("");

  const [contractSelected, setContractSelected] = useState<Contract | null>(
    null
  );
  const [openContractDetails, setOpenContractDetails] =
    useState<boolean>(false);

  const [paymentReferenceInput, setPaymentReferenceInput] = useState("");
  const [isLoadingReference, setIsLoadingReference] = useState(false);
  const [isSavingReference, setIsSavingReference] = useState(false);

  const isPaymentStatus =
    contractSelected?.lease_status?.toLowerCase() === "payment";

  const fetchPaymentReference = useCallback(
    async (leaseId: number, fallback: string) => {
      setIsLoadingReference(true);
      try {
        const { data } = await api.get<{
          lease_payment_reference: string | null;
        }>(`/get_reference/${leaseId}`);
        setPaymentReferenceInput(data.lease_payment_reference ?? "");
      } catch {
        setPaymentReferenceInput(fallback);
      } finally {
        setIsLoadingReference(false);
      }
    },
    []
  );

  useEffect(() => {
    if (openContractDetails && contractSelected && isPaymentStatus) {
      const fallback = contractSelected.lease_payment_reference ?? "";
      setPaymentReferenceInput(fallback);
      fetchPaymentReference(contractSelected.lease_id, fallback);
    }
  }, [
    openContractDetails,
    contractSelected?.lease_id,
    contractSelected?.lease_payment_reference,
    isPaymentStatus,
    fetchPaymentReference,
  ]);

  const handleSavePaymentReference = async () => {
    if (!contractSelected?.lease_id) return;
    setIsSavingReference(true);
    try {
      await api.put(
        `/update_reference/${contractSelected.lease_id}?reference=${encodeURIComponent(paymentReferenceInput.trim())}`
      );
      setContractSelected((prev) =>
        prev
          ? { ...prev, lease_payment_reference: paymentReferenceInput.trim() }
          : null
      );
    } finally {
      setIsSavingReference(false);
    }
  };

  const handleContractSelected = (contract: Contract) => {
    setContractSelected(contract);
    setOpenContractDetails(true);
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search contracts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-10 py-2 h-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white placeholder:text-content/60"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results counter */}
      {searchTerm && (
        <div className="text-sm text-muted-foreground">
          Showing 2 of 2 properties
        </div>
      )}

      {/* Properties list */}
      <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6 2xl:grid-cols-3">
        {filteredContracts.map((contract: Contract) => (
          <ContractCard
            key={contract.lease_id}
            contract={contract}
            handleContractSelected={handleContractSelected}
          />
        ))}
      </div>

      {/* DETALLES DE PROPIEDAD */}
      <Drawer open={openContractDetails} onOpenChange={setOpenContractDetails}>
        <DrawerContent className="h-[95dvh] !max-h-screen">
          <DrawerHeader className="pt-2 pb-4 flex justify-between flex-col border-b">
            <div className="w-full flex items-center justify-center relative">
              <DrawerClose asChild>
                <Button
                  variant={"outline"}
                  className="border-none bg-primary/10 text-primary rounded-full text-base !pl-2 !pr-4 absolute left-0"
                  onClick={() => {
                    setOpenContractDetails(false);
                    setContractSelected(null);
                  }}
                >
                  <ChevronLeft className="size-5" /> Close
                </Button>
              </DrawerClose>
              <DrawerTitle className="text-primary font-bold text-xl">
                Contract Details
              </DrawerTitle>
            </div>
          </DrawerHeader>
          <div className="bg-[#F7F8FA] w-full h-full p-4 flex flex-col items-center gap-3 overflow-y-auto">
            <h2 className="font-bold text-primary text-2xl">
              Contract #{contractSelected?.lease_id}
            </h2>

            <div className="w-full p-4 flex flex-col items-start gap-3 bg-white border rounded-xl">
              <h3
                className={cn(
                  "flex items-center gap-2 text-lg font-medium",
                  contractSelected?.lease_status === "Available"
                    ? "text-green-500"
                    : contractSelected?.lease_status?.toLowerCase() ===
                        "payment"
                      ? "text-primary"
                      : "text-orange-500"
                )}
              >
                <FaFlag className="size-5" />
                Contract Status
              </h3>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4",
                  contractSelected?.lease_status === "Available"
                    ? "bg-green-100"
                    : contractSelected?.lease_status?.toLowerCase() ===
                        "payment"
                      ? "bg-primary/10"
                      : "bg-orange-100"
                )}
              >
                <FaCircleCheck
                  className={cn(
                    "size-5",
                    contractSelected?.lease_status === "Available"
                      ? "text-green-500"
                      : contractSelected?.lease_status?.toLowerCase() ===
                          "payment"
                        ? "text-primary"
                        : "text-orange-500"
                  )}
                />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">Current Status</span>
                  <span
                    className={cn(
                      "text-base",
                      contractSelected?.lease_status === "Available"
                        ? "text-green-500"
                        : contractSelected?.lease_status?.toLowerCase() ===
                            "payment"
                          ? "text-primary"
                          : "text-orange-500"
                    )}
                  >
                    {contractSelected?.lease_status}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <BsExclamationCircle className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">
                    Status Description
                  </span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_status}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <IoIosCalendar className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">
                    Lease agreement due by
                  </span>
                  <span className={cn("text-base")}>
                    {formatToShortDate(
                      contractSelected?.lease_created_at as string
                    )}
                  </span>
                </div>
              </div>

              {isPaymentStatus && (
                <div className="w-full p-4 border rounded-xl flex flex-col gap-3 bg-primary/5 border-primary/20">
                  <h3 className="flex items-center gap-2 text-lg font-medium text-primary">
                    <FaMoneyBill className="size-5" />
                    Payment reference
                  </h3>
                  <p className="text-content text-sm">
                    Add or edit the payment reference code.
                  </p>
                  {isLoadingReference ? (
                    <span className="text-content text-sm">Loading...</span>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Input
                        placeholder="e.g. ABC 123"
                        value={paymentReferenceInput}
                        onChange={(e) =>
                          setPaymentReferenceInput(e.target.value)
                        }
                        className="w-full"
                      />
                      <Button
                        onClick={handleSavePaymentReference}
                        disabled={isSavingReference}
                        className="w-full sm:w-auto"
                      >
                        {isSavingReference ? "Saving..." : "Save reference"}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="w-full p-4 flex flex-col items-start gap-3 bg-white border rounded-xl">
              <h3
                className={cn(
                  "flex items-center gap-2 text-lg font-medium text-primary"
                )}
              >
                <FaExclamation className="size-5" />
                Basic Information
              </h3>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <RiArmchairFill className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">Furnished Status</span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_furnished_status}
                  </span>
                </div>
              </div>

              <div className="w-full flex max-md:flex-col gap-4">
                <div
                  className={cn(
                    "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                  )}
                >
                  <CalendarIcon className={cn("size-5 text-primary")} />
                  <div className="flex flex-col gap-0 leading-[1]">
                    <span className="text-content text-sm">Start Date</span>
                    <span className={cn("text-base")}>
                      {formatToShortDate(
                        contractSelected?.lease_start_date as string
                      )}
                    </span>
                  </div>
                </div>

                <div
                  className={cn(
                    "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                  )}
                >
                  <CalendarIcon className={cn("size-5 text-primary")} />
                  <div className="flex flex-col gap-0 leading-[1]">
                    <span className="text-content text-sm">End Date</span>
                    <span className={cn("text-base")}>
                      {formatToShortDate(
                        contractSelected?.lease_end_date as string
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full flex max-md:flex-col gap-4">
                <div
                  className={cn(
                    "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                  )}
                >
                  <FaDollarSign className={cn("size-5 text-primary")} />
                  <div className="flex flex-col gap-0 leading-[1]">
                    <span className="text-content text-sm">Monthly Rent</span>
                    <span className={cn("text-base")}>
                      {contractSelected?.lease_monthly_rent}
                    </span>
                  </div>
                </div>

                <div
                  className={cn(
                    "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                  )}
                >
                  <FaCalendarAlt className={cn("size-5 text-primary")} />
                  <div className="flex flex-col gap-0 leading-[1]">
                    <span className="text-content text-sm">
                      Due Day of Month
                    </span>
                    <span className={cn("text-base")}>
                      {contractSelected?.lease_day_of_month}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full p-4 flex flex-col items-start gap-3 bg-white border rounded-xl">
              <h3
                className={cn(
                  "flex items-center gap-2 text-lg font-medium text-green-600"
                )}
              >
                <FaMoneyBill className="size-5" />
                Financial Details
              </h3>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <ShieldIcon className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">Security Deposit</span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_security_deposit}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <CalendarIcon className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">
                    First month rent plus taxes
                  </span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_first_month_rent}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <CalendarIcon className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">Last month rent</span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_last_month_rent}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <HomeIcon className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">
                    Due Before Occupancy
                  </span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_due_before_occupancy}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <Building2Icon className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">
                    Security deposit for association
                  </span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_association_deposit}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <Building2Icon className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">Association Fees</span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_association_fees}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <UserPlusIcon className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">
                    Tenant Pays Association Fee
                  </span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_tenant_will_pay_association_fee}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <PiSigmaBold className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">Total Rent</span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_total_rent}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <FaMoneyBill className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">Full Amount</span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_full_amount}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <FaHandPaper className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">Rentsafe deposit</span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_holder_deposit_amount}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full p-4 flex flex-col items-start gap-3 bg-white border rounded-xl">
              <h3
                className={cn(
                  "flex items-center gap-2 text-lg font-medium text-blue-600"
                )}
              >
                <FaSignature className="size-5" />
                Contract Preparation
              </h3>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <UserCheck2 className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">
                    Lease prepared by
                  </span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_landlord_agree === "Y"
                      ? "Landlord"
                      : "Tenant"}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full p-4 flex flex-col items-start gap-3 bg-white border rounded-xl">
              <h3
                className={cn(
                  "flex items-center gap-2 text-lg font-medium text-amber-800"
                )}
              >
                <MdOutlinePets className="size-5" />
                Pet Information
              </h3>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <MdOutlinePets className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">Pets Allowed</span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_pets_allowed === "Y"
                      ? "Yes"
                      : "No"}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <MdOutlinePets className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">Pet Deposit</span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_pet_deposit}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "w-full px-4 py-2 border rounded-xl flex items-center justify-start gap-4"
                )}
              >
                <MdOutlinePets className={cn("size-5 text-primary")} />
                <div className="flex flex-col gap-0 leading-[1]">
                  <span className="text-content text-sm">Pet Deposit Type</span>
                  <span className={cn("text-base")}>
                    {contractSelected?.lease_pets_condition}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
