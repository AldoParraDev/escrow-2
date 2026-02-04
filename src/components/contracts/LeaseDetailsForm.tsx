"use client";

import { FaCircleExclamation } from "react-icons/fa6";
import { PiUserCircleFill, PiUserCirclePlusFill } from "react-icons/pi";
import { FaCheck, FaRegBuilding, FaSignature } from "react-icons/fa";
import { RiArmchairFill } from "react-icons/ri";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { UserData } from "@/types/user";
import { Property } from "@/types/property";
import { useNewContractStore } from "@/store/new-contract.store";
import { IoIosCalendar } from "react-icons/io";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useAuthStore } from "@/store/auth.store";
import { TbUsersGroup } from "react-icons/tb";
import { IoInformationCircleOutline } from "react-icons/io5";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, PlusCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import NewUserForm from "../NewUserForm";

export default function LeaseDetailsForm() {
  const {
    tenantId,
    landlordId,
    propertyId,
    isRented,
    setLandlordId,
    setTenantId,
    setPropertyId,
    setIsRented,
    leaseStartDate,
    leaseEndDate,
    leaseAgreementDueBy,
    setLeaseStartDate,
    setLeaseEndDate,
    setLeaseAgreementDueBy,
    leasePreparedBy,
    setLeasePreparedBy,
    cooperatingBroker,
    setCooperatingBroker,
    cooperatingBrokerType,
    setCooperatingBrokerType,
  } = useNewContractStore();
  const { userLoggedIn } = useAuthStore();
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

  const [listProperties, setListProperties] = useState<Property[]>([]);
  const handleGetProperties = async () => {
    const response = await api.get("/properties", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setListProperties(response.data);
    } else {
      console.log(response);
      setListProperties([]);
    }
  };

  useEffect(() => {
    handleGetUsers();
    handleGetProperties();
  }, []);

  const [openLandlord, setOpenLandlord] = useState<boolean>(false);
  const [openTenant, setOpenTenant] = useState<boolean>(false);
  const [openProperty, setOpenProperty] = useState<boolean>(false);
  const [openCooperatingBroker, setOpenCooperatingBroker] =
    useState<boolean>(false);

  const [openNewTenant, setOpenNewTenant] = useState<boolean>(false);
  const [openNewLandlord, setOpenNewLandlord] = useState<boolean>(false);

  return (
    <>
      <ScrollArea className="h-[calc(100vh-270px)] w-full pb-6">
        <div className="mb-2 flex items-center gap-3">
          <p className="font-medium leading-[1] text-primary text-sm">
            Step 1 of 4
          </p>
          <span className="text-xs text-content">Lease Details</span>
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <div className="flex items-center justify-start gap-4">
            <FaCircleExclamation className="text-primary size-6" />
            <div className="flex flex-col items-start gap-0 leading-[1]">
              <h2 className="font-bold text-primary text-2xl">Lease Details</h2>
              <p className="text-content text-sm">Basic contract information</p>
            </div>
          </div>

          <div className="w-full p-4 bg-white border rounded-xl flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <PiUserCircleFill className="text-primary/80" />
                Landlord <span className="text-red-500">*</span>
              </label>

              <Popover open={openLandlord} onOpenChange={setOpenLandlord}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {landlordId ? (
                      <span className="font-normal">
                        {listUsers
                          .filter((user) => user.user_role === "landlord")
                          .find(
                            (framework) =>
                              String(framework.user_id) === landlordId
                          )?.user_first_name +
                          " " +
                          listUsers
                            .filter((user) => user.user_role === "landlord")
                            .find(
                              (framework) =>
                                String(framework.user_id) === landlordId
                            )?.user_last_name}
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-normal">
                        Select landlord...
                      </span>
                    )}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[330px] p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Search landlord..."
                      className="h-9"
                    />
                    <CommandItem
                      className="border-b rounded-b-none"
                      onSelect={() => {
                        setOpenLandlord(false);
                        setOpenNewLandlord(true);
                      }}
                    >
                      <PlusCircleIcon className="text-primary" /> New Landlord
                    </CommandItem>
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {listUsers
                          .filter((user) => user.user_role === "landlord")
                          .map((framework) => (
                            <CommandItem
                              key={framework.user_id}
                              value={String(
                                framework.user_first_name +
                                  " " +
                                  framework.user_last_name
                              )}
                              onSelect={() => {
                                setLandlordId(String(framework.user_id));
                                setOpenLandlord(false);
                              }}
                            >
                              {framework.user_first_name}{" "}
                              {framework.user_last_name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  landlordId === String(framework.user_id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <PiUserCirclePlusFill className="text-primary/80" />
                Tenant <span className="text-red-500">*</span>
              </label>

              <Popover open={openTenant} onOpenChange={setOpenTenant} modal>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {tenantId ? (
                      <span className="font-normal">
                        {listUsers
                          .filter((user) => user.user_role === "tenant")
                          .find(
                            (framework) =>
                              String(framework.user_id) === tenantId
                          )?.user_first_name +
                          " " +
                          listUsers
                            .filter((user) => user.user_role === "tenant")
                            .find(
                              (framework) =>
                                String(framework.user_id) === tenantId
                            )?.user_last_name}
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-normal">
                        Select tenant...
                      </span>
                    )}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Search tenant..."
                      className="h-9"
                    />
                    <CommandItem
                      onSelect={() => {
                        setOpenTenant(false);
                        setOpenNewTenant(true);
                      }}
                    >
                      <PlusCircleIcon className="text-primary" /> New Tenant
                    </CommandItem>
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {listUsers
                          .filter((user) => user.user_role === "tenant")
                          .map((framework) => (
                            <CommandItem
                              key={framework.user_id}
                              value={String(
                                framework.user_first_name +
                                  " " +
                                  framework.user_last_name
                              )}
                              onSelect={() => {
                                setTenantId(String(framework.user_id));
                                setOpenTenant(false);
                              }}
                            >
                              {framework.user_first_name}{" "}
                              {framework.user_last_name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  tenantId === String(framework.user_id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <FaRegBuilding className="text-primary/80" />
                Property <span className="text-red-500">*</span>
              </label>

              <Popover open={openProperty} onOpenChange={setOpenProperty} modal>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {propertyId ? (
                      <span className="font-normal">
                        {
                          listProperties.find(
                            (framework) =>
                              String(framework.property_id) === propertyId
                          )?.property_name
                        }
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-normal">
                        Select property...
                      </span>
                    )}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Search property..."
                      className="h-9"
                    />
                    <CommandItem className="p-0">
                      <Link
                        href="/properties/new"
                        className="flex items-center gap-2 w-full h-full px-2 py-1 hover:bg-primary/10"
                      >
                        <PlusCircleIcon className="text-primary" /> New Property
                      </Link>
                    </CommandItem>
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {listProperties.map((framework) => (
                          <CommandItem
                            key={framework.property_id}
                            value={String(framework.property_name)}
                            onSelect={() => {
                              setPropertyId(String(framework.property_id));
                              setOpenProperty(false);
                            }}
                          >
                            {framework.property_name}
                            <Check
                              className={cn(
                                "ml-auto",
                                tenantId === String(framework.property_id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <TbUsersGroup className="text-primary/80" />
                Cooperating Broker
              </label>

              <Popover
                open={openCooperatingBroker}
                onOpenChange={setOpenCooperatingBroker}
                modal
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {cooperatingBroker ? (
                      <span className="font-normal">
                        {listUsers
                          .filter(
                            (user) =>
                              user.user_role === "broker" &&
                              userLoggedIn?.user_id !== user.user_id
                          )
                          .find(
                            (framework) =>
                              String(framework.user_id) === cooperatingBroker
                          )?.user_first_name +
                          " " +
                          listUsers
                            .filter(
                              (user) =>
                                user.user_role === "broker" &&
                                userLoggedIn?.user_id !== user.user_id
                            )
                            .find(
                              (framework) =>
                                String(framework.user_id) === cooperatingBroker
                            )?.user_last_name}
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-normal">
                        Select cooperating broker...
                      </span>
                    )}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Search cooperating broker..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {listUsers
                          .filter(
                            (user) =>
                              user.user_role === "broker" &&
                              userLoggedIn?.user_id !== user.user_id
                          )
                          .map((framework) => (
                            <CommandItem
                              key={framework.user_id}
                              value={String(
                                framework.user_first_name +
                                  " " +
                                  framework.user_last_name
                              )}
                              onSelect={() => {
                                setCooperatingBroker(String(framework.user_id));
                                setOpenCooperatingBroker(false);
                              }}
                            >
                              {framework.user_first_name}{" "}
                              {framework.user_last_name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  cooperatingBroker ===
                                    String(framework.user_id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {cooperatingBroker && (
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-content font-normal">
                  <IoInformationCircleOutline className="text-primary/80" />
                  Cooperating Broker Type *
                </label>
                <RadioGroup
                  value={cooperatingBrokerType}
                  onValueChange={setCooperatingBrokerType}
                  className="mt-2 space-y-1"
                >
                  <div
                    className="flex items-center gap-3 px-4 h-10 bg-gray-50 rounded-lg border border-gray-300"
                    data-state={cooperatingBrokerType === "L" ? "checked" : ""}
                  >
                    <RadioGroupItem value="L" id="L" className="peer" />
                    <Label
                      htmlFor="L"
                      className="cursor-pointer peer-data-[state=checked]:font-semibold"
                    >
                      Landlord Broker
                    </Label>
                    {cooperatingBrokerType === "L" && (
                      <span className="ml-auto text-green-600">
                        {/* Check icon */}
                        <FaCheck className="size-3" />
                      </span>
                    )}
                  </div>
                  <div
                    className="flex items-center gap-3 px-4 h-10 bg-gray-50 rounded-lg border border-gray-300"
                    data-state={cooperatingBrokerType === "T" ? "checked" : ""}
                  >
                    <RadioGroupItem value="T" id="T" className="peer" />
                    <Label
                      htmlFor="T"
                      className="cursor-pointer peer-data-[state=checked]:font-semibold"
                    >
                      Tenant Broker
                    </Label>
                    {cooperatingBrokerType === "T" && (
                      <span className="ml-auto text-green-600">
                        {/* Check icon */}
                        <FaCheck className="size-3" />
                      </span>
                    )}
                  </div>
                </RadioGroup>
              </div>
            )}

            <div className="flex items-center justify-between border rounded-xl p-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <RiArmchairFill className="size-6 text-primary" />
                  <h3 className="font-bold text-black">Furnished Property</h3>
                </div>
                <p className="font-light text-content text-sm">
                  Is this property furnished?
                </p>
              </div>

              <Switch checked={isRented} onCheckedChange={setIsRented} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <IoIosCalendar className="text-primary/80" />
                Lease Start Date *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!leaseStartDate}
                    className="data-[empty=true]:text-muted-foreground w-full h-10 justify-start text-left font-normal"
                  >
                    {leaseStartDate ? (
                      <span className="truncate">
                        {format(leaseStartDate, "MMM d, yyyy", {
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
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={leaseStartDate}
                    onSelect={setLeaseStartDate}
                    required
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <IoIosCalendar className="text-primary/80" />
                Lease End Date *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!leaseEndDate}
                    className="data-[empty=true]:text-muted-foreground w-full h-10 justify-start text-left font-normal"
                  >
                    {leaseEndDate ? (
                      <span className="truncate">
                        {format(leaseEndDate, "MMM d, yyyy", {
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
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={leaseEndDate}
                    onSelect={setLeaseEndDate}
                    required
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <IoIosCalendar className="text-primary/80" />
                Lease agreement due by
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!leaseAgreementDueBy}
                    className="data-[empty=true]:text-muted-foreground w-full h-10 justify-start text-left font-normal"
                  >
                    {leaseAgreementDueBy ? (
                      <span className="truncate">
                        {format(leaseAgreementDueBy, "MMM d, yyyy", {
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
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={leaseAgreementDueBy}
                    onSelect={setLeaseAgreementDueBy}
                    required
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="bg-white p-4 border rounded-xl flex flex-col gap-6 mb-50">
            <div className="flex items-center gap-2">
              {/* Puedes sustituir por tu ícono preferido */}
              <FaSignature className="size-5 text-blue-700" />
              <span className="text-blue-700 font-semibold text-lg">
                Contract Preparation
              </span>
            </div>
            <div>
              <span className="font-medium">Lease prepared by:</span>
              <RadioGroup
                value={leasePreparedBy}
                onValueChange={setLeasePreparedBy}
                className="mt-2 space-y-1"
              >
                <div
                  className="flex items-center gap-3 px-4 h-10 bg-gray-50 rounded-lg border border-gray-300"
                  data-state={leasePreparedBy === "landlord" ? "checked" : ""}
                >
                  <RadioGroupItem
                    value="landlord"
                    id="landlord"
                    className="peer"
                  />
                  <Label
                    htmlFor="landlord"
                    className="cursor-pointer peer-data-[state=checked]:font-semibold"
                  >
                    Landlord
                  </Label>
                  {leasePreparedBy === "landlord" && (
                    <span className="ml-auto text-green-600">
                      {/* Check icon */}
                      <FaCheck className="size-3" />
                    </span>
                  )}
                </div>
                <div
                  className="flex items-center gap-3 px-4 h-10 bg-gray-50 rounded-lg border border-gray-300"
                  data-state={leasePreparedBy === "tenant" ? "checked" : ""}
                >
                  <RadioGroupItem value="tenant" id="tenant" className="peer" />
                  <Label
                    htmlFor="tenant"
                    className="cursor-pointer peer-data-[state=checked]:font-semibold"
                  >
                    Tenant
                  </Label>
                  {leasePreparedBy === "tenant" && (
                    <span className="ml-auto text-green-600">
                      {/* Check icon */}
                      <FaCheck className="size-3" />
                    </span>
                  )}
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </ScrollArea>

      <Dialog open={openNewTenant} onOpenChange={setOpenNewTenant}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Tenant</DialogTitle>
            <DialogDescription>
              Enter the basic information to create a new tenant.
            </DialogDescription>
          </DialogHeader>
          <NewUserForm
            onLoading={() => {
              handleGetUsers();
              setOpenNewTenant(false);
            }}
            onCancel={() => {
              setOpenNewTenant(false);
            }}
            type="tenant"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openNewLandlord} onOpenChange={setOpenNewLandlord}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Landlord</DialogTitle>
            <DialogDescription>
              Enter the basic information to create a new landlord.
            </DialogDescription>
          </DialogHeader>
          <NewUserForm
            onLoading={() => {
              handleGetUsers();
              setOpenNewLandlord(false);
            }}
            onCancel={() => {
              setOpenNewLandlord(false);
            }}
            type="landlord"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
