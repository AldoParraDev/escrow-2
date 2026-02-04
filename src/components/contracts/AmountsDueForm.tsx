"use client";

import { FaHandPaper, FaMoneyBill } from "react-icons/fa";
import { ScrollArea } from "../ui/scroll-area";
import { BiDollarCircle } from "react-icons/bi";
import { Input } from "../ui/input";
import { LuDollarSign } from "react-icons/lu";
import { IoIosCalendar } from "react-icons/io";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { FaCalendarDays, FaClockRotateLeft, FaShield } from "react-icons/fa6";
import { useNewContractStore } from "@/store/new-contract.store";
import { useState } from "react";
import { MdOutlinePets } from "react-icons/md";
import { Switch } from "../ui/switch";

export default function AmountsDueForm() {
  const {
    firstMonthRent,
    firstMonthDueOn,
    advanceRentMonth,
    advanceRent,
    advanceRentDueOn,
    setFirstMonthRent,
    setFirstMonthDueOn,
    setAdvanceRentMonth,
    setAdvanceRent,
    setAdvanceRentDueOn,
    setTotalRent,
    leaseStartDate,
    leaseEndDate,
    lastMonthRent,
    lastMonthDueOn,
    setLastMonthRent,
    setLastMonthDueOn,
    securityDeposit,
    setSecurityDeposit,
    securityDepositDueOn,
    setSecurityDepositDueOn,
    securityDepositAssociation,
    securityDepositAssociationDueOn,
    setSecurityDepositAssociation,
    setSecurityDepositAssociationDueOn,
    rentsafeDeposit,
    setRentsafeDeposit,
    petDeposit,
    petDepositDueOn,
    setPetDeposit,
    setPetDepositDueOn,
    petDepositRefundable,
    setPetDepositRefundable,
    setToFirstMonthRent,
    setToLastMonthRent,
    setToSecurityDeposit,
  } = useNewContractStore();

  // Estados locales para manejar el valor temporal durante la edición
  const [tempFirstMonthRent, setTempFirstMonthRent] = useState(
    firstMonthRent.toString()
  );
  const [tempAdvanceRent, setTempAdvanceRent] = useState(
    advanceRent.toString()
  );
  const [tempLastMonthRent, setTempLastMonthRent] = useState(
    lastMonthRent.toString()
  );
  const [tempSecurityDeposit, setTempSecurityDeposit] = useState(
    securityDeposit.toString()
  );
  const [tempSecurityDepositAssociation, setTempSecurityDepositAssociation] =
    useState(securityDepositAssociation.toString());
  const [tempRentsafeDeposit, setTempRentsafeDeposit] = useState(
    rentsafeDeposit.toString()
  );
  const [tempPetDeposit, setTempPetDeposit] = useState(petDeposit.toString());

  const [isFirstMonthFocused, setIsFirstMonthFocused] = useState(false);
  const [isAdvanceRentFocused, setIsAdvanceRentFocused] = useState(false);
  const [isLastMonthFocused, setIsLastMonthFocused] = useState(false);
  const [isSecurityDepositFocused, setIsSecurityDepositFocused] =
    useState(false);
  const [
    isSecurityDepositAssociationFocused,
    setIsSecurityDepositAssociationFocused,
  ] = useState(false);
  const [isRentsafeDepositFocused, setIsRentsafeDepositFocused] =
    useState(false);
  const [isPetDepositFocused, setIsPetDepositFocused] = useState(false);

  // Manejadores para el primer mes de renta
  const handleFirstMonthFocus = () => {
    setIsFirstMonthFocused(true);
    // Si el valor actual es 0, mostramos campo vacío al enfocar
    if (firstMonthRent === 0) {
      setTempFirstMonthRent("");
    }
  };

  const handleFirstMonthBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFirstMonthFocused(false);
    const value = e.target.value;

    if (value === "") {
      // Si el campo está vacío, establecer a 0
      setFirstMonthRent(0);
      setTempFirstMonthRent("0");
    } else {
      // Convertir a número y actualizar el store
      const numValue = Number(value);
      setFirstMonthRent(numValue);
      setTempFirstMonthRent(numValue.toString());
    }
  };

  const handleFirstMonthChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir solo números y punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setTempFirstMonthRent(value);
    }
  };

  // Manejadores para la renta adelantada
  const handleAdvanceRentFocus = () => {
    setIsAdvanceRentFocused(true);
    // Si el valor actual es 0, mostramos campo vacío al enfocar
    if (advanceRent === 0) {
      setTempAdvanceRent("");
    }
  };

  const handleAdvanceRentBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsAdvanceRentFocused(false);
    const value = e.target.value;

    if (value === "") {
      // Si el campo está vacío, establecer a 0
      setAdvanceRent(0);
      setTempAdvanceRent("0");
    } else {
      // Convertir a número y actualizar el store
      const numValue = Number(value);
      setAdvanceRent(numValue);
      setTempAdvanceRent(numValue.toString());
    }
  };

  const handleAdvanceRentChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir solo números y punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setTempAdvanceRent(value);
    }
  };

  // Manejadores
  const handleLastMonthFocus = () => {
    setIsLastMonthFocused(true);
    // Si el valor actual es 0, mostramos campo vacío al enfocar
    if (lastMonthRent === 0) {
      setTempLastMonthRent("");
    }
  };

  const handleLastMonthBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsLastMonthFocused(false);
    const value = e.target.value;

    if (value === "") {
      // Si el campo está vacío, establecer a 0
      setLastMonthRent(0);
      setTempLastMonthRent("0");
    } else {
      // Convertir a número y actualizar el store
      const numValue = Number(value);
      setLastMonthRent(numValue);
      setTempLastMonthRent(numValue.toString());
    }
  };

  const handleLastMonthChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir solo números y punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setTempLastMonthRent(value);
    }
  };

  // Manejadores
  const handleSecurityDepositFocus = () => {
    setIsSecurityDepositFocused(true);
    // Si el valor actual es 0, mostramos campo vacío al enfocar
    if (securityDeposit === 0) {
      setTempSecurityDeposit("");
    }
  };

  const handleSecurityDepositBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsSecurityDepositFocused(false);
    const value = e.target.value;

    if (value === "") {
      // Si el campo está vacío, establecer a 0
      setSecurityDeposit(0);
      setTempSecurityDeposit("0");
    } else {
      // Convertir a número y actualizar el store
      const numValue = Number(value);
      setSecurityDeposit(numValue);
      setTempSecurityDeposit(numValue.toString());
    }
  };

  const handleSecurityDepositChange = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // Permitir solo números y punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setTempSecurityDeposit(value);
    }
  };

  // Manejadores
  const handleSecurityDepositAssociationFocus = () => {
    setIsSecurityDepositAssociationFocused(true);
    // Si el valor actual es 0, mostramos campo vacío al enfocar
    if (securityDepositAssociation === 0) {
      setTempSecurityDepositAssociation("");
    }
  };

  const handleSecurityDepositAssociationBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    setIsSecurityDepositAssociationFocused(false);
    const value = e.target.value;

    if (value === "") {
      // Si el campo está vacío, establecer a 0
      setSecurityDepositAssociation(0);
      setTempSecurityDepositAssociation("0");
    } else {
      // Convertir a número y actualizar el store
      const numValue = Number(value);
      setSecurityDepositAssociation(numValue);
      setTempSecurityDepositAssociation(numValue.toString());
    }
  };

  const handleSecurityDepositAssociationChange = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // Permitir solo números y punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setTempSecurityDepositAssociation(value);
    }
  };

  // Manejadores
  const handleRentsafeDepositFocus = () => {
    setIsRentsafeDepositFocused(true);
    // Si el valor actual es 0, mostramos campo vacío al enfocar
    if (rentsafeDeposit === 0) {
      setTempRentsafeDeposit("");
    }
  };

  const handleRentsafeDepositBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsRentsafeDepositFocused(false);
    const value = e.target.value;

    if (value === "") {
      // Si el campo está vacío, establecer a 0
      setRentsafeDeposit(0);
      setTempRentsafeDeposit("0");
    } else {
      // Convertir a número y actualizar el store
      const numValue = Number(value);
      setRentsafeDeposit(numValue);
      setTempRentsafeDeposit(numValue.toString());
      setToFirstMonthRent(numValue / 3);
      setToLastMonthRent(numValue / 3);
      setToSecurityDeposit(numValue / 3);
      const number_years =
        leaseEndDate.getFullYear() - leaseStartDate.getFullYear();
      const number_months = leaseEndDate.getMonth() - leaseStartDate.getMonth();
      const result = number_years * 12 + number_months + 1;
      setTotalRent(numValue * result);
    }
  };

  const handleRentsafeDepositChange = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // Permitir solo números y punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setTempRentsafeDeposit(value);
      setToFirstMonthRent(Number(value) / 3);
      setToLastMonthRent(Number(value) / 3);
      setToSecurityDeposit(Number(value) / 3);
      const number_years =
        leaseEndDate.getFullYear() - leaseStartDate.getFullYear();
      const number_months = leaseEndDate.getMonth() - leaseStartDate.getMonth();
      const result = number_years * 12 + number_months + 1;

      setTotalRent(Number(value) * result);
    }
  };

  // Manejadores
  const handlePetDepositFocus = () => {
    setIsPetDepositFocused(true);
    // Si el valor actual es 0, mostramos campo vacío al enfocar
    if (petDeposit === 0) {
      setTempPetDeposit("");
    }
  };

  const handlePetDepositBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsPetDepositFocused(false);
    const value = e.target.value;

    if (value === "") {
      // Si el campo está vacío, establecer a 0
      setPetDeposit(0);
      setTempPetDeposit("0");
    } else {
      // Convertir a número y actualizar el store
      const numValue = Number(value);
      setPetDeposit(numValue);
      setTempPetDeposit(numValue.toString());
    }
  };

  const handlePetDepositChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir solo números y punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setTempPetDeposit(value);
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-270px)] w-full pb-6">
      <div className="mb-2 flex items-center gap-3">
        <p className="font-medium leading-[1] text-primary text-sm">
          Step 2 of 4
        </p>
        <span className="text-xs text-content">Amounts Due</span>
      </div>
      <div className="w-full flex flex-col gap-2 ">
        <div className="flex items-center justify-start gap-4">
          <FaMoneyBill className="text-primary size-6" />
          <div className="flex flex-col items-start gap-0 leading-[1]">
            <h2 className="font-bold text-primary text-2xl">Amounts Due</h2>
            <p className="text-content text-sm">
              Payment details and due dates
            </p>
          </div>
        </div>

        <div className="w-full p-4 bg-white border rounded-xl flex flex-col gap-6 mb-50">
          <h2 className="font-bold text-primary text-lg flex items-center gap-2">
            <span className="size-6 flex items-center justify-center rounded-full bg-primary text-white text-sm">
              1
            </span>
            First month rent plus taxes
          </h2>
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <BiDollarCircle className="text-primary/80" />
                Amount
              </label>
              <div className="relative">
                <Input
                  className="peer ps-9 h-12"
                  placeholder="0.00"
                  type="text" // Cambiamos a text para mejor control
                  inputMode="decimal" // Para teclado numérico en dispositivos móviles
                  value={
                    isFirstMonthFocused
                      ? tempFirstMonthRent
                      : firstMonthRent === 0
                        ? ""
                        : firstMonthRent.toString()
                  }
                  onChange={handleFirstMonthChange}
                  onFocus={handleFirstMonthFocus}
                  onBlur={handleFirstMonthBlur}
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
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <IoIosCalendar className="text-primary/80" />
                Due Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!firstMonthDueOn}
                    className="data-[empty=true]:text-muted-foreground w-full h-12 justify-start text-left font-normal"
                  >
                    {firstMonthDueOn ? (
                      <span className="truncate">
                        {format(firstMonthDueOn, "MMM d, yyyy", {
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
                    selected={firstMonthDueOn}
                    onSelect={setFirstMonthDueOn}
                    required
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <h2 className="font-bold text-purple-500 text-xl flex items-center gap-2">
            <FaClockRotateLeft className="text-purple-500 size-6" />
            Advance Rent
          </h2>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <IoIosCalendar className="text-primary/80" />
              Month of
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!advanceRentMonth}
                  className="data-[empty=true]:text-muted-foreground w-full h-12 justify-start text-left font-normal"
                >
                  {advanceRentMonth ? (
                    <span className="truncate">
                      {format(advanceRentMonth, "MMMM do", { locale: enUS })}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-base font-normal">
                      e.g., December 2025
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={advanceRentMonth}
                  onSelect={setAdvanceRentMonth}
                  required
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <BiDollarCircle className="text-primary/80" />
                Amount
              </label>
              <div className="relative">
                <Input
                  className="peer ps-9 h-12"
                  placeholder="0.00"
                  type="text" // Cambiamos a text para mejor control
                  inputMode="decimal" // Para teclado numérico en dispositivos móviles
                  value={
                    isAdvanceRentFocused
                      ? tempAdvanceRent
                      : advanceRent === 0
                        ? ""
                        : advanceRent.toString()
                  }
                  onChange={handleAdvanceRentChange}
                  onFocus={handleAdvanceRentFocus}
                  onBlur={handleAdvanceRentBlur}
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
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <IoIosCalendar className="text-primary/80" />
                Due Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!advanceRentDueOn}
                    className="data-[empty=true]:text-muted-foreground w-full h-12 justify-start text-left font-normal"
                  >
                    {advanceRentDueOn ? (
                      <span className="truncate">
                        {format(advanceRentDueOn, "MMM d, yyyy", {
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
                    selected={advanceRentDueOn}
                    onSelect={setAdvanceRentDueOn}
                    required
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <h2 className="font-bold text-primary text-xl flex items-center gap-2">
            <FaCalendarDays className="text-primary size-6" />
            Last Month Rent
          </h2>

          <div className="w-full grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <BiDollarCircle className="text-primary/80" />
                Amount
              </label>
              <div className="relative">
                <Input
                  className="peer ps-9 h-12"
                  placeholder="0.00"
                  type="text" // Cambiamos a text para mejor control
                  inputMode="decimal" // Para teclado numérico en dispositivos móviles
                  value={
                    isLastMonthFocused
                      ? tempLastMonthRent
                      : lastMonthRent === 0
                        ? ""
                        : lastMonthRent.toString()
                  }
                  onChange={handleLastMonthChange}
                  onFocus={handleLastMonthFocus}
                  onBlur={handleLastMonthBlur}
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
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <IoIosCalendar className="text-primary/80" />
                Due Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!lastMonthDueOn}
                    className="data-[empty=true]:text-muted-foreground w-full h-12 justify-start text-left font-normal"
                  >
                    {lastMonthDueOn ? (
                      <span className="truncate">
                        {format(lastMonthDueOn, "MMM d, yyyy", {
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
                    selected={lastMonthDueOn}
                    onSelect={setLastMonthDueOn}
                    required
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <h2 className="font-bold text-green-500 text-xl flex items-center gap-2">
            <FaMoneyBill className="text-green-500 size-6" />
            Security & Deposits
          </h2>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <FaShield className="text-primary/80" />
              Security deposit
            </label>
            <div className="relative">
              <Input
                className="peer ps-9 h-12"
                placeholder="0.00"
                type="text" // Cambiamos a text para mejor control
                inputMode="decimal" // Para teclado numérico en dispositivos móviles
                value={
                  isSecurityDepositFocused
                    ? tempSecurityDeposit
                    : securityDeposit === 0
                      ? ""
                      : securityDeposit.toString()
                }
                onChange={handleSecurityDepositChange}
                onFocus={handleSecurityDepositFocus}
                onBlur={handleSecurityDepositBlur}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <LuDollarSign size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <IoIosCalendar className="text-primary/80" />
              Security deposit due
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!securityDepositDueOn}
                  className="data-[empty=true]:text-muted-foreground w-full h-12 justify-start text-left font-normal"
                >
                  {securityDepositDueOn ? (
                    <span className="truncate">
                      {format(securityDepositDueOn, "MMM d, yyyy", {
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
                  selected={securityDepositDueOn}
                  onSelect={setSecurityDepositDueOn}
                  required
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <FaShield className="text-primary/80" />
              Security deposit for association
            </label>
            <div className="relative">
              <Input
                className="peer ps-9 h-12"
                placeholder="0.00"
                type="text" // Cambiamos a text para mejor control
                inputMode="decimal" // Para teclado numérico en dispositivos móviles
                value={
                  isSecurityDepositAssociationFocused
                    ? tempSecurityDepositAssociation
                    : securityDepositAssociation === 0
                      ? ""
                      : securityDepositAssociation.toString()
                }
                onChange={handleSecurityDepositAssociationChange}
                onFocus={handleSecurityDepositAssociationFocus}
                onBlur={handleSecurityDepositAssociationBlur}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <LuDollarSign size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <IoIosCalendar className="text-primary/80" />
              Security deposit for association due
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!securityDepositAssociationDueOn}
                  className="data-[empty=true]:text-muted-foreground w-full h-12 justify-start text-left font-normal"
                >
                  {securityDepositAssociationDueOn ? (
                    <span className="truncate">
                      {format(securityDepositAssociationDueOn, "MMM d, yyyy", {
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
                  selected={securityDepositAssociationDueOn}
                  onSelect={setSecurityDepositAssociationDueOn}
                  required
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <FaHandPaper className="text-primary/80" />
              Initial escrow deposit *
            </label>
            <div className="relative">
              <Input
                className="peer ps-9 h-12"
                placeholder="0.00"
                type="text" // Cambiamos a text para mejor control
                inputMode="decimal" // Para teclado numérico en dispositivos móviles
                value={
                  isRentsafeDepositFocused
                    ? tempRentsafeDeposit
                    : rentsafeDeposit === 0
                      ? ""
                      : rentsafeDeposit.toString()
                }
                onChange={handleRentsafeDepositChange}
                onFocus={handleRentsafeDepositFocus}
                onBlur={handleRentsafeDepositBlur}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <LuDollarSign size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
          </div>

          <h2 className="font-bold text-primary text-xl flex items-center gap-2">
            <MdOutlinePets className="text-primary size-6" />
            Pet Deposit
          </h2>

          <div className="w-full grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <BiDollarCircle className="text-primary/80" />
                Amount
              </label>
              <div className="relative">
                <Input
                  className="peer ps-9 h-12"
                  placeholder="0.00"
                  type="text" // Cambiamos a text para mejor control
                  inputMode="decimal" // Para teclado numérico en dispositivos móviles
                  value={
                    isPetDepositFocused
                      ? tempPetDeposit
                      : petDeposit === 0
                        ? ""
                        : petDeposit.toString()
                  }
                  onChange={handlePetDepositChange}
                  onFocus={handlePetDepositFocus}
                  onBlur={handlePetDepositBlur}
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
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <IoIosCalendar className="text-primary/80" />
                Due Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!petDepositDueOn}
                    className="data-[empty=true]:text-muted-foreground w-full h-12 justify-start text-left font-normal"
                  >
                    {petDepositDueOn ? (
                      <span className="truncate">
                        {format(petDepositDueOn, "MMM d, yyyy", {
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
                    selected={petDepositDueOn}
                    onSelect={setPetDepositDueOn}
                    required
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center justify-between border rounded-xl p-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <MdOutlinePets className="size-6 text-orange-400" />
                <h3 className="font-bold text-black">Pet Deposit Refundable</h3>
              </div>
              <p className="font-light text-content text-sm">
                Will the pet deposit be refundable?
              </p>
            </div>

            <Switch
              checked={petDepositRefundable}
              onCheckedChange={setPetDepositRefundable}
            />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
