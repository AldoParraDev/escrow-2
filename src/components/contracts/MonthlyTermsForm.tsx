"use client";

import { IoCard, IoEllipsisHorizontalCircle } from "react-icons/io5";
import { ScrollArea } from "../ui/scroll-area";
import {
  FaChartPie,
  FaCheck,
  FaFileAlt,
  FaMoneyBill,
  FaSmoking,
} from "react-icons/fa";
import { Input } from "../ui/input";
import { LuDollarSign } from "react-icons/lu";
import { IoIosCalendar } from "react-icons/io";
import { FaShield } from "react-icons/fa6";
import { useNewContractStore } from "@/store/new-contract.store";
import { useState } from "react"; // Importamos useState para manejar el estado local
import { AiFillDollarCircle } from "react-icons/ai";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { MdCalendarMonth, MdOutlinePets } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { enUS } from "date-fns/locale";
import { Textarea } from "../ui/textarea";

const LIST_DAYS = [
  { id: 1, day: "1" },
  { id: 2, day: "2" },
  { id: 3, day: "3" },
  { id: 4, day: "4" },
  { id: 5, day: "5" },
  { id: 6, day: "6" },
  { id: 7, day: "7" },
  { id: 8, day: "8" },
  { id: 9, day: "9" },
  { id: 10, day: "10" },
  { id: 11, day: "11" },
  { id: 12, day: "12" },
  { id: 13, day: "13" },
  { id: 14, day: "14" },
  { id: 15, day: "15" },
  { id: 16, day: "16" },
  { id: 17, day: "17" },
  { id: 18, day: "18" },
  { id: 19, day: "19" },
  { id: 20, day: "20" },
  { id: 21, day: "21" },
  { id: 22, day: "22" },
  { id: 23, day: "23" },
  { id: 24, day: "24" },
  { id: 25, day: "25" },
  { id: 26, day: "26" },
  { id: 27, day: "27" },
  { id: 28, day: "28" },
  { id: 29, day: "29" },
  { id: 30, day: "30" },
  { id: 31, day: "31" },
];

export default function MonthlyTermsForm() {
  const {
    rentsafeDeposit,
    toFirstMonthRent,
    toLastMonthRent,
    toSecurityDeposit,
    toOther,
    setToFirstMonthRent,
    setToLastMonthRent,
    setToSecurityDeposit,
    setToOther,
    totalRent,
    tenantWillPay,
    dayOfEachmonth,
    monthlyRent,
    paymentDate,
    paymentTotalAmount,
    petsAllowed,
    smokingAllowed,
    setTotalRent,
    setTenantWillPay,
    setDayOfEachmonth,
    setMonthlyRent,
    setPaymentDate,
    setPaymentTotalAmount,
    setPetsAllowed,
    setSmokingAllowed,
    petsCondition,
    setPetsCondition,
  } = useNewContractStore();

  // Estados locales para manejar el valor temporal durante la edición
  const [tempToFirstMonthRent, setTempToFirstMonthRent] = useState(
    (rentsafeDeposit / 3).toString()
  );
  const [tempToLastMonthRent, setTempToLastMonthRent] = useState(
    (rentsafeDeposit / 3).toString()
  );
  const [tempToSecurityDeposit, setTempToSecurityDeposit] = useState(
    (rentsafeDeposit / 3).toString()
  );
  const [tempToOther, setTempToOther] = useState(toOther.toString());
  const [tempTotalRent, setTempTotalRent] = useState(totalRent.toString());
  const [tempMonthlyRent, setTempMonthlyRent] = useState(
    monthlyRent.toString()
  );
  const [tempPaymentTotalAmount, setTempPaymentTotalAmount] = useState(
    paymentTotalAmount.toString()
  );

  const [isToFirstMonthRentFocused, setIsToFirstMonthRentFocused] =
    useState(false);
  const [isToLastMonthRentFocused, setIsToLastMonthRentFocused] =
    useState(false);
  const [isToSecurityDepositFocused, setIsToSecurityDepositFocused] =
    useState(false);
  const [isToOtherFocused, setIsToOtherFocused] = useState(false);
  const [isTotalRentFocused, setIsTotalRentFocused] = useState(false);
  const [isMonthlyRentFocused, setIsMonthlyRentFocused] = useState(false);
  const [isPaymentTotalAmountFocused, setIsPaymentTotalAmountFocused] =
    useState(false);

  // Manejadores para To First Month Rent
  const handleToFirstMonthRentFocus = () => {
    setIsToFirstMonthRentFocused(true);
    if (toFirstMonthRent === 0) {
      setTempToFirstMonthRent("");
    }
  };

  const handleToFirstMonthRentBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    setIsToFirstMonthRentFocused(false);
    const value = e.target.value;

    if (value === "") {
      setToFirstMonthRent(0);
      setTempToFirstMonthRent("0");
    } else {
      const numValue = Number(value);
      setToFirstMonthRent(numValue);
      setTempToFirstMonthRent(numValue.toString());
    }
  };

  const handleToFirstMonthRentChange = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTempToFirstMonthRent(value);
    }
  };

  // Manejadores para To Last Month Rent
  const handleToLastMonthRentFocus = () => {
    setIsToLastMonthRentFocused(true);
    if (toLastMonthRent === 0) {
      setTempToLastMonthRent("");
    }
  };

  const handleToLastMonthRentBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsToLastMonthRentFocused(false);
    const value = e.target.value;

    if (value === "") {
      setToLastMonthRent(0);
      setTempToLastMonthRent("0");
    } else {
      const numValue = Number(value);
      setToLastMonthRent(numValue);
      setTempToLastMonthRent(numValue.toString());
    }
  };

  const handleToLastMonthRentChange = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTempToLastMonthRent(value);
    }
  };

  // Manejadores para To Security Deposit
  const handleToSecurityDepositFocus = () => {
    setIsToSecurityDepositFocused(true);
    if (toSecurityDeposit === 0) {
      setTempToSecurityDeposit("");
    }
  };

  const handleToSecurityDepositBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    setIsToSecurityDepositFocused(false);
    const value = e.target.value;

    if (value === "") {
      setToSecurityDeposit(0);
      setTempToSecurityDeposit("0");
    } else {
      const numValue = Number(value);
      setToSecurityDeposit(numValue);
      setTempToSecurityDeposit(numValue.toString());
    }
  };

  const handleToSecurityDepositChange = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTempToSecurityDeposit(value);
    }
  };

  // Manejadores para To Other
  const handleToOtherFocus = () => {
    setIsToOtherFocused(true);
    if (toOther === 0) {
      setTempToOther("");
    }
  };

  const handleToOtherBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsToOtherFocused(false);
    const value = e.target.value;

    if (value === "") {
      setToOther(0);
      setTempToOther("0");
    } else {
      const numValue = Number(value);
      setToOther(numValue);
      setTempToOther(numValue.toString());
    }
  };

  const handleToOtherChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTempToOther(value);
    }
  };

  // Manejadores
  const handleTotalRentFocus = () => {
    setIsTotalRentFocused(true);
    if (totalRent === 0) {
      setTempTotalRent("");
    }
  };

  const handleTotalRentBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTotalRentFocused(false);
    const value = e.target.value;

    if (value === "") {
      setTotalRent(0);
      setTempTotalRent("0");
    } else {
      const numValue = Number(value);
      setTotalRent(numValue);
      setTempTotalRent(numValue.toString());
    }
  };

  const handleTotalRentChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTempTotalRent(value);
    }
  };

  // Manejadores
  const handleMonthlyRentFocus = () => {
    setIsMonthlyRentFocused(true);
    if (monthlyRent === 0) {
      setTempMonthlyRent("");
    }
  };

  const handleMonthlyRentBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsMonthlyRentFocused(false);
    const value = e.target.value;

    if (value === "") {
      setMonthlyRent(0);
      setTempMonthlyRent("0");
    } else {
      const numValue = Number(value);
      setMonthlyRent(numValue);
      setTempMonthlyRent(numValue.toString());
    }
  };

  const handleMonthlyRentChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTempMonthlyRent(value);
    }
  };

  // Manejadores
  const handlePaymentTotalAmountFocus = () => {
    setIsPaymentTotalAmountFocused(true);
    if (paymentTotalAmount === 0) {
      setTempPaymentTotalAmount("");
    }
  };

  const handlePaymentTotalAmountBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    setIsPaymentTotalAmountFocused(false);
    const value = e.target.value;

    if (value === "") {
      setPaymentTotalAmount(0);
      setTempPaymentTotalAmount("0");
    } else {
      const numValue = Number(value);
      setPaymentTotalAmount(numValue);
      setTempPaymentTotalAmount(numValue.toString());
    }
  };

  const handlePaymentTotalAmountChange = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTempPaymentTotalAmount(value);
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-310px)] w-full">
      <div className="mb-2 flex items-center gap-3">
        <p className="font-medium leading-[1] text-primary text-sm">
          Step 3 of 4
        </p>
        <span className="text-xs text-content">
          Monthly Terms
        </span>
      </div>
      <div className="w-full flex flex-col gap-2 ">
        <div className="flex items-center justify-start gap-4">
          <IoCard className="text-primary size-6" />
          <div className="flex flex-col items-start gap-0 leading-[1]">
            <h2 className="font-bold text-primary text-2xl">Monthly Terms</h2>
            <p className="text-content text-sm">Ongoing payment structure</p>
          </div>
        </div>

        <div className="w-full p-4 bg-white border rounded-xl flex flex-col gap-6">
          <h2 className="font-bold text-[#5953C6] text-lg flex items-center gap-2">
            <FaChartPie className="text-[#5953C6] size-6" />
            Deposit will be credited as follows
          </h2>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <span className="size-4 flex items-center justify-center rounded-full bg-primary/70 text-white text-xs">
                1
              </span>
              To First Month Rent
            </label>
            <div className="relative">
              <Input
                className="peer ps-9 h-12"
                placeholder="0.00"
                type="text"
                inputMode="decimal"
                value={
                  isToFirstMonthRentFocused
                    ? tempToFirstMonthRent
                    : toFirstMonthRent === 0
                      ? ""
                      : parseFloat(String(toFirstMonthRent)).toFixed(2)
                }
                onChange={handleToFirstMonthRentChange}
                onFocus={handleToFirstMonthRentFocus}
                onBlur={handleToFirstMonthRentBlur}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <LuDollarSign size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <IoIosCalendar className="text-primary/80" />
              To Last Month Rent
            </label>
            <div className="relative">
              <Input
                className="peer ps-9 h-12"
                placeholder="0.00"
                type="text"
                inputMode="decimal"
                value={
                  isToLastMonthRentFocused
                    ? tempToLastMonthRent
                    : toLastMonthRent === 0
                      ? ""
                      : parseFloat(String(toLastMonthRent)).toFixed(2)
                }
                onChange={handleToLastMonthRentChange}
                onFocus={handleToLastMonthRentFocus}
                onBlur={handleToLastMonthRentBlur}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <LuDollarSign size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <FaShield className="text-primary/80" />
              To Security Deposit
            </label>
            <div className="relative">
              <Input
                className="peer ps-9 h-12"
                placeholder="0.00"
                type="text"
                inputMode="decimal"
                value={
                  isToSecurityDepositFocused
                    ? tempToSecurityDeposit
                    : toSecurityDeposit === 0
                      ? ""
                      : parseFloat(String(toSecurityDeposit)).toFixed(2)
                }
                onChange={handleToSecurityDepositChange}
                onFocus={handleToSecurityDepositFocus}
                onBlur={handleToSecurityDepositBlur}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <LuDollarSign size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <IoEllipsisHorizontalCircle className="text-primary/80" />
              To Other
            </label>
            <div className="relative">
              <Input
                className="peer ps-9 h-12"
                placeholder="0.00"
                type="text"
                inputMode="decimal"
                value={
                  isToOtherFocused
                    ? tempToOther
                    : toOther === 0
                      ? ""
                      : toOther.toString()
                }
                onChange={handleToOtherChange}
                onFocus={handleToOtherFocus}
                onBlur={handleToOtherBlur}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <LuDollarSign size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
          </div>

          <h2 className="font-bold text-[#01C3BA] text-lg flex items-center gap-2">
            <IoCard className="text-[#01C3BA] size-6" />
            Rent payment details
          </h2>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <AiFillDollarCircle className="text-primary/80" />
              Total Rent
            </label>
            <div className="relative">
              <Input
                className="peer ps-9 h-12"
                placeholder="0.00"
                type="text"
                inputMode="decimal"
                value={
                  isTotalRentFocused
                    ? tempTotalRent
                    : totalRent === 0
                      ? ""
                      : totalRent.toString()
                }
                onChange={handleTotalRentChange}
                onFocus={handleTotalRentFocus}
                onBlur={handleTotalRentBlur}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <LuDollarSign size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div>
            <span className="font-medium">Tenant will pay the rent:</span>
            <RadioGroup
              value={tenantWillPay}
              onValueChange={setTenantWillPay}
              className="mt-2 space-y-0"
            >
              <div
                className="flex items-center gap-3 px-4 h-10 bg-gray-50 rounded-lg border border-gray-300"
                data-state={tenantWillPay === "full" ? "checked" : ""}
              >
                <RadioGroupItem value="full" id="full" className="peer" />
                <Label
                  htmlFor="full"
                  className="cursor-pointer peer-data-[state=checked]:font-semibold"
                >
                  In Full
                </Label>
                {tenantWillPay === "full" && (
                  <span className="ml-auto text-green-600">
                    {/* Check icon */}
                    <FaCheck className="size-3" />
                  </span>
                )}
              </div>
              <div
                className="flex items-center gap-3 px-4 h-10 bg-gray-50 rounded-lg border border-gray-300"
                data-state={tenantWillPay === "monthly" ? "checked" : ""}
              >
                <RadioGroupItem value="monthly" id="monthly" className="peer" />
                <Label
                  htmlFor="monthly"
                  className="cursor-pointer peer-data-[state=checked]:font-semibold"
                >
                  Monthly
                </Label>
                {tenantWillPay === "monthly" && (
                  <span className="ml-auto text-green-600">
                    {/* Check icon */}
                    <FaCheck className="size-3" />
                  </span>
                )}
              </div>
            </RadioGroup>
          </div>

          {tenantWillPay === "full" && (
            <>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-content font-normal">
                  <IoIosCalendar className="text-primary/80" />
                  Payment Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!paymentDate}
                      className="data-[empty=true]:text-muted-foreground w-full h-12 justify-start text-left font-normal"
                    >
                      {paymentDate ? (
                        <span className="truncate">
                          {format(paymentDate, "MMM d, yyyy", {
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
                      selected={paymentDate}
                      onSelect={setPaymentDate}
                      required
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-content font-normal">
                  <FaMoneyBill className="text-primary/80" />
                  Total Amount
                </label>
                <div className="relative">
                  <Input
                    className="peer ps-9 h-12"
                    placeholder="0.00"
                    type="text"
                    inputMode="decimal"
                    value={
                      isPaymentTotalAmountFocused
                        ? tempPaymentTotalAmount
                        : paymentTotalAmount === 0
                          ? ""
                          : paymentTotalAmount.toString()
                    }
                    onChange={handlePaymentTotalAmountChange}
                    onFocus={handlePaymentTotalAmountFocus}
                    onBlur={handlePaymentTotalAmountBlur}
                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <LuDollarSign
                      size={16}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {tenantWillPay === "monthly" && (
            <>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-content font-normal">
                  <MdCalendarMonth className="text-primary/80" />
                  Day of each month *
                </label>
                <Select
                  value={dayOfEachmonth}
                  onValueChange={setDayOfEachmonth}
                >
                  <SelectTrigger className="w-full !h-12">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {LIST_DAYS.map((day) => (
                      <SelectItem
                        key={day.id}
                        value={String(day.id)}
                        className="capitalize"
                      >
                        {day.day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-content font-normal">
                  <MdCalendarMonth className="text-primary/80" />
                  Monthly Rent
                </label>
                <div className="relative">
                  <Input
                    className="peer ps-9 h-12"
                    placeholder="0.00"
                    type="text"
                    inputMode="decimal"
                    value={
                      isMonthlyRentFocused
                        ? tempMonthlyRent
                        : monthlyRent === 0
                          ? ""
                          : monthlyRent.toString()
                    }
                    onChange={handleMonthlyRentChange}
                    onFocus={handleMonthlyRentFocus}
                    onBlur={handleMonthlyRentBlur}
                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <LuDollarSign
                      size={16}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <h2 className="font-bold text-red-500 text-lg flex items-center gap-2">
            <FaFileAlt className="text-red-500 size-6" />
            Property Policies
          </h2>

          <div className="flex items-center justify-between border rounded-xl p-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <MdOutlinePets className="size-6 text-orange-400" />
                <h3 className="font-bold text-black">Pets Allowed</h3>
              </div>
              <p className="font-light text-content text-sm">
                Are pets permitted on the property?
              </p>
            </div>

            <Switch checked={petsAllowed} onCheckedChange={setPetsAllowed} />
          </div>

          {petsAllowed && (
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <MdOutlinePets className="text-primary/80" />
                Pets Description
              </label>
              <Textarea
                placeholder="Describe allowed pets (type, size, etc.)"
                className="h-26 placeholder:text-content/60"
                value={petsCondition}
                onChange={(e) => setPetsCondition(e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center justify-between border rounded-xl p-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <FaSmoking className="size-6 text-red-400" />
                <h3 className="font-bold text-black">Smoking Allowed</h3>
              </div>
              <p className="font-light text-content text-sm">
                Is smoking permitted on the property?
              </p>
            </div>

            <Switch
              checked={smokingAllowed}
              onCheckedChange={setSmokingAllowed}
            />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
