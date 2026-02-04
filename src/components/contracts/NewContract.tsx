"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { useState } from "react";

//import { Document, Page, pdfjs } from "react-pdf";

//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const steps = [1, 2, 3, 4];

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import LeaseDetailsForm from "./LeaseDetailsForm";
import AmountsDueForm from "./AmountsDueForm";
import MonthlyTermsForm from "./MonthlyTermsForm";
import AdditionalTermsForm from "./AdditionalTermsForm";
import { useNewContractStore } from "@/store/new-contract.store";
import { toast } from "sonner";
import api from "@/lib/axios";
import { format } from "date-fns";
import { useAuthStore } from "@/store/auth.store";
// import { getContractPreview } from "@/services/getContractPreview";
import { MdModeEdit } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  onLoading: () => void;
}

export default function NewContract({ onLoading }: Props) {
  const {
    landlordId,
    tenantId,
    propertyId,
    isRented,
    firstMonthRent,
    firstMonthDueOn,
    advanceRentMonth,
    advanceRent,
    advanceRentDueOn,
    toFirstMonthRent,
    toLastMonthRent,
    toSecurityDeposit,
    toOther,
    isReadyToCreate,
    leaseStartDate,
    leaseEndDate,
    leaseAgreementDueBy,
    lastMonthRent,
    lastMonthDueOn,
    securityDeposit,
    securityDepositDueOn,
    securityDepositAssociation,
    securityDepositAssociationDueOn,
    rentsafeDeposit,
    petDeposit,
    petDepositDueOn,
    petDepositRefundable,
    leasePreparedBy,
    totalRent,
    tenantWillPay,
    paymentDate,
    paymentTotalAmount,
    dayOfEachmonth,
    monthlyRent,
    petsAllowed,
    smokingAllowed,
    utilitiesExeption,
    associationDeposit,
    associationFees,
    associationAppDue,
    tenantPaysAssociationFee,
    serviceMemberTenant,
    maintenanceException,
    additionalTerms,
    resetContract,
    cooperatingBroker,
    cooperatingBrokerType,
    petsCondition,
    isStepReady,
    getMissingFieldsByStep,
  } = useNewContractStore();
  const { userLoggedIn } = useAuthStore();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);

  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [contractPdf, setContractPdf] = useState<string | null>(null);
  const [leaseId, setLeaseId] = useState<string>("");
  const [editedActive, setEditedActive] = useState<boolean>(false);
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
  const [loadingAprove, setLoadingApprove] = useState<boolean>(false);

  const router = useRouter();

  //const [pdfData, setPdfData] = useState<Uint8Array | null>(null);

  const handleNextStep = () => {
    if (!isStepReady(currentStep)) {
      const missing = getMissingFieldsByStep(currentStep);
      toast.error(
        `Please complete the following fields: ${missing.join(", ")}`,
        { duration: 4000, position: "top-right" }
      );
      return;
    }
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  const handleCreateContract = async () => {
    setLoadingCreate(true);

    if (!isReadyToCreate()) {
      const missing: string[] = [];
      steps.forEach((s) => {
        missing.push(...getMissingFieldsByStep(s));
      });

      toast.error(
        `Cannot create contract. Missing fields: ${missing.join(", ")}`,
        { duration: 5000, position: "top-right" }
      );
      setLoadingCreate(false);
      return;
    }

    const response = await api.post("/lease_contracts", {
      landlord_id: landlordId,
      tenant_id: tenantId,
      property_id: propertyId,
      lease_furnished_status: isRented ? "Y" : "N",
      lease_start_date: format(leaseStartDate, "yyyy-MM-dd"),
      lease_end_date: format(leaseEndDate, "yyyy-MM-dd"),
      lease_due_to_complete: format(leaseAgreementDueBy, "yyyy-MM-dd"),
      lease_landlord_agree: leasePreparedBy === "landlord" ? "Y" : "N",
      lease_tenant_agree: leasePreparedBy === "tenant" ? "Y" : "N",
      cooperating_broker_id: cooperatingBroker ? cooperatingBroker : 0,
      cooperating_broker_type: cooperatingBrokerType,

      lease_first_month_rent: firstMonthRent,
      lease_first_month_due_on: format(firstMonthDueOn, "yyyy-MM-dd"),
      lease_advance_rent_month: format(advanceRentMonth, "yyyy-MM-dd"),
      lease_advance_rent: advanceRent,
      lease_advance_rent_due: format(advanceRentDueOn, "yyyy-MM-dd"),
      lease_last_month_rent: lastMonthRent,
      lease_last_month_due_on: format(lastMonthDueOn, "yyyy-MM-dd"),
      lease_security_deposit: securityDeposit,
      lease_security_due_on: format(securityDepositDueOn, "yyyy-MM-dd"),
      xx: securityDepositAssociation,
      lease_association_due_on: format(
        securityDepositAssociationDueOn,
        "yyyy-MM-dd"
      ),
      lease_holder_deposit_amount: rentsafeDeposit,
      lease_pet_deposit: petDeposit,
      lease_pet_due_on: format(petDepositDueOn, "yyyy-MM-dd"),
      lease_pet_deposit_refundable: petDepositRefundable ? "Y" : "N",

      lease_to_first_month_rent: toFirstMonthRent,
      lease_to_last_month_rent: toLastMonthRent,
      lease_to_security_deposit: toSecurityDeposit,
      lease_to_other: toOther,
      lease_total_rent: totalRent,
      lease_pay_in_full_check: tenantWillPay === "full" ? "Y" : "N",
      lease_pay_monthly_check: tenantWillPay === "monthly" ? "Y" : "N",
      lease_pay_in_full_on: format(paymentDate, "yyyy-MM-dd"),
      lease_full_amount: paymentTotalAmount,
      lease_day_of_month: dayOfEachmonth,
      lease_monthly_rent: monthlyRent,
      lease_pets_allowed: petsAllowed ? "Y" : "N",
      lease_pets_condition: petsCondition,
      lease_smoking_allowed: smokingAllowed ? "Y" : "N",

      lease_utilities_exception: utilitiesExeption,
      lease_association_deposit: associationDeposit,
      lease_association_fees: associationFees,
      lease_association_aproval: format(associationAppDue, "yyyy-MM-dd"),
      lease_tenant_will_pay_association_fee: tenantPaysAssociationFee
        ? "Y"
        : "N",
      lease_tenant_service_member: serviceMemberTenant ? "Y" : "N",
      lease_maintenance_exception: maintenanceException,
      lease_additional_terms: additionalTerms,

      lease_status: "Contract",
      broker_id: userLoggedIn?.user_id,
      lease_tenant_will_pay: "",
      lease_to_first_month_rent_check: "",
      lease_to_last_month_rent_check: "",
      lease_to_security_deposit_check: "",
      lease_to_other_check: "",
      lease_deposit_holder: "",
      lease_due_before_occupancy: 0,
      lease_envelope_id: "",
      lease_disburse_approved_by_broker: "",
      lease_disburse_approved_by_landlord: "",
      lease_disburse_approved_by_tenant: "",
    });

    if (response.status === 200) {
      toast.success("Contract created successfully", {
        position: "top-right",
        duration: 3000,
      });

      setLeaseId(response.data.lease_id);
      setOpenPreview(true);

      setContractPdf(
        `https://escrow-android.dev-qa.site/preview-pdf/${response.data.lease_id}`
      );

      setLoadingCreate(false);
      onLoading();
    } else {
      toast.error("Error creating contract", {
        position: "top-right",
        duration: 3000,
      });
      setLoadingCreate(false);
    }
    setLoadingCreate(false);
  };

  const handleUpdateContract = async () => {
    setLoadingEdit(true);
    if (!isReadyToCreate()) {
      const missing: string[] = [];
      steps.forEach((s) => {
        missing.push(...getMissingFieldsByStep(s));
      });

      toast.error(
        `Cannot create contract. Missing fields: ${missing.join(", ")}`,
        { duration: 5000, position: "top-right" }
      );
      setLoadingCreate(false);
      return;
    }

    const response = await api.put(`/lease_contracts/${leaseId}`, {
      landlord_id: landlordId,
      tenant_id: tenantId,
      property_id: propertyId,
      lease_furnished_status: isRented ? "Y" : "N",
      lease_start_date: format(leaseStartDate, "yyyy-MM-dd"),
      lease_end_date: format(leaseEndDate, "yyyy-MM-dd"),
      lease_due_to_complete: format(leaseAgreementDueBy, "yyyy-MM-dd"),
      lease_landlord_agree: leasePreparedBy === "landlord" ? "Y" : "N",
      lease_tenant_agree: leasePreparedBy === "tenant" ? "Y" : "N",
      cooperating_broker_id: cooperatingBroker ? cooperatingBroker : 0,
      cooperating_broker_type: cooperatingBrokerType,

      lease_first_month_rent: firstMonthRent,
      lease_first_month_due_on: format(firstMonthDueOn, "yyyy-MM-dd"),
      lease_advance_rent_month: format(advanceRentMonth, "yyyy-MM-dd"),
      lease_advance_rent: advanceRent,
      lease_advance_rent_due: format(advanceRentDueOn, "yyyy-MM-dd"),
      lease_last_month_rent: lastMonthRent,
      lease_last_month_due_on: format(lastMonthDueOn, "yyyy-MM-dd"),
      lease_security_deposit: securityDeposit,
      lease_security_due_on: format(securityDepositDueOn, "yyyy-MM-dd"),
      xx: securityDepositAssociation,
      lease_association_due_on: format(
        securityDepositAssociationDueOn,
        "yyyy-MM-dd"
      ),
      lease_holder_deposit_amount: rentsafeDeposit,
      lease_pet_deposit: petDeposit,
      lease_pet_due_on: format(petDepositDueOn, "yyyy-MM-dd"),
      lease_pet_deposit_refundable: petDepositRefundable ? "Y" : "N",

      lease_to_first_month_rent: toFirstMonthRent,
      lease_to_last_month_rent: toLastMonthRent,
      lease_to_security_deposit: toSecurityDeposit,
      lease_to_other: toOther,
      lease_total_rent: totalRent,
      lease_pay_in_full_check: tenantWillPay === "full" ? "Y" : "N",
      lease_pay_monthly_check: tenantWillPay === "monthly" ? "Y" : "N",
      lease_pay_in_full_on: format(paymentDate, "yyyy-MM-dd"),
      lease_full_amount: paymentTotalAmount,
      lease_day_of_month: dayOfEachmonth,
      lease_monthly_rent: monthlyRent,
      lease_pets_allowed: petsAllowed ? "Y" : "N",
      lease_pets_condition: petsCondition,
      lease_smoking_allowed: smokingAllowed ? "Y" : "N",

      lease_utilities_exception: utilitiesExeption,
      lease_association_deposit: associationDeposit,
      lease_association_fees: associationFees,
      lease_association_aproval: format(associationAppDue, "yyyy-MM-dd"),
      lease_tenant_will_pay_association_fee: tenantPaysAssociationFee
        ? "Y"
        : "N",
      lease_tenant_service_member: serviceMemberTenant ? "Y" : "N",
      lease_maintenance_exception: maintenanceException,
      lease_additional_terms: additionalTerms,

      lease_status: "Contract",
      broker_id: userLoggedIn?.user_id,
      lease_tenant_will_pay: "",
      lease_to_first_month_rent_check: "",
      lease_to_last_month_rent_check: "",
      lease_to_security_deposit_check: "",
      lease_to_other_check: "",
      lease_deposit_holder: "",
      lease_due_before_occupancy: 0,
      lease_envelope_id: "",
      lease_disburse_approved_by_broker: "",
      lease_disburse_approved_by_landlord: "",
      lease_disburse_approved_by_tenant: "",
    });

    if (response.status === 200) {
      toast.success("Contract updated successfully", {
        position: "top-right",
        duration: 3000,
      });

      setOpenPreview(true);
      // const preview = await getContractPreview(Number(leaseId));
      //const preview = await getContractPreview(response.data.lease_id);

      // const preview = await getContractPreview(response.data.lease_id);

      // const blob = new Blob([preview.data], { type: "application/pdf" });
      // const url = URL.createObjectURL(blob);

      setContractPdf(
        `https://escrow-android.dev-qa.site/preview-pdf/${leaseId}`
      );
      // setOpenForm(false);
      // resetContract();
      setLoadingCreate(false);
      onLoading();

      // router.push("/contracts");
    } else {
      toast.error("Error creating contract", {
        position: "top-right",
        duration: 3000,
      });
      setLoadingCreate(false);
    }

    setLoadingEdit(false);
  };

  const handleAproveContract = async () => {
    setLoadingApprove(true);
    const response = await api.patch(
      `/lease_contracts/${leaseId}?lease_status=Ready`
    );

    if (response.status === 200) {
      toast.success("Contract approved successfully", {
        position: "top-right",
        duration: 3000,
      });

      setLeaseId("");
      setOpenPreview(false);
      setEditedActive(false);
      resetContract();
      setLoadingCreate(false);
      setLoadingApprove(false);
      setLoadingEdit(false);
      onLoading();

      router.push("/contracts");
    } else {
      toast.error("Error aproving contract", {
        position: "top-right",
        duration: 3000,
      });
      setLoadingCreate(false);
    }
    setLoadingApprove(false);
  };

  return (
    <div className="bg-[#F7F8FA] px-3 flex flex-col gap-4 pt-[30px] pb-[90px] sm:px-8 xl:pb-[40px] 2xl:px-[8rem]">
      <div className="!max-h-screen relative">
        <div className="pt-2 pb-4 flex justify-center items-center flex-col border-b">
          <div className="w-full flex items-center justify-center relative">
            <Link
              href="/contracts"
              className="border-none bg-primary/10 text-primary rounded-full text-base !pl-2 !pr-4 absolute left-0 flex items-center gap-2 !py-2"
              onClick={resetContract}
            >
              <ChevronLeft className="size-5" /> Cancel
            </Link>
            <h2 className="text-primary font-bold text-xl">
              {editedActive ? "Edit Contract" : "New Contract"}
            </h2>
          </div>

          <Stepper
            defaultValue={1}
            className="mt-5 mb-0 pb-0 px-5"
            value={currentStep}
            onValueChange={setCurrentStep}
          >
            {steps.map((step) => (
              <StepperItem key={step} step={step} className="not-last:flex-1">
                <StepperTrigger asChild>
                  <StepperIndicator />
                </StepperTrigger>
                {step < steps.length && <StepperSeparator />}
              </StepperItem>
            ))}
          </Stepper>
        </div>

        <div className="bg-[#F7F8FA] w-full h-full pt-4">
          {/* <div className="mb-2 flex items-center gap-3">
            <p className="font-medium leading-[1] text-primary text-sm">
              Step {currentStep} of 4
            </p>
            <span className="text-xs text-content">
              {currentStep === 1 && "Lease Details"}
              {currentStep === 2 && "Amounts Due"}
              {currentStep === 3 && "Monthly Terms"}
              {currentStep === 4 && "Additional Terms"}
            </span>
          </div> */}
          {currentStep === 1 && <LeaseDetailsForm />}
          {currentStep === 2 && <AmountsDueForm />}
          {currentStep === 3 && <MonthlyTermsForm />}
          {currentStep === 4 && <AdditionalTermsForm />}
        </div>

        <div className="fixed bottom-[80px] right-0 left-0 w-full flex-row justify-between px-4">
          {editedActive ? (
            <div className="w-full flex items-center justify-between gap-4">
              <Button
                variant="default"
                onClick={handleUpdateContract}
                className="flex-1 bg-green-500 text-white hover:bg-green-500 hover:text-white"
              >
                {loadingEdit ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <CheckCircle />
                )}
                Save edit
              </Button>
            </div>
          ) : (
            <div className="w-full flex items-center justify-between gap-4">
              {currentStep !== 1 && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentStep((prev) => Math.max(1, prev - 1))
                  }
                  className="flex-1 bg-primary/10 border border-primary/30"
                >
                  <ChevronLeft />
                  Prev
                </Button>
              )}

              {currentStep === 4 ? (
                <Button
                  variant="default"
                  onClick={handleCreateContract}
                  className="flex-1 bg-green-500 text-white hover:bg-green-500 hover:text-white"
                >
                  {loadingCreate ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <CheckCircle />
                  )}
                  Preview
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleNextStep}
                  className="flex-1"
                >
                  Next
                  <ChevronRight />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <Drawer open={openPreview} onOpenChange={setOpenPreview}>
        <DrawerContent className="h-[95dvh] !max-h-screen">
          <DrawerHeader className="pt-2 pb-4 flex justify-between flex-col border-b">
            <div className="w-full flex items-center justify-center relative">
              <DrawerClose asChild>
                <Button
                  variant={"outline"}
                  className="border-none bg-primary/10 text-primary rounded-full text-base !pl-2 !pr-4 absolute left-0"
                  onClick={() => setOpenPreview(false)}
                >
                  <ChevronLeft className="size-5" /> Cancel
                </Button>
              </DrawerClose>
              <DrawerTitle className="text-primary font-bold text-xl flex flex-col items-center justify-center text-center">
                Contract Preview
                <span className="text-xs text-content">Lease #{leaseId}</span>
              </DrawerTitle>
            </div>
          </DrawerHeader>

          {loadingCreate ? (
            <div className="bg-[#F7F8FA] w-full h-full p-4">
              <Loader2 className="animate-spin size-8" />
            </div>
          ) : (
            <div className="bg-[#F7F8FA] w-full h-full p-4">
              {contractPdf && (
                <iframe
                  src={contractPdf}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                />
              )}
            </div>
          )}

          <DrawerFooter className="border-t fixed bottom-0 right-0 left-0 w-screen bg-white flex-row justify-between">
            <div className="w-full flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenPreview(false);
                  setEditedActive(true);
                }}
                className="flex-1 bg-primary/10 border border-primary/30"
              >
                <MdModeEdit />
                Edit
              </Button>

              <Button
                variant="outline"
                onClick={() => handleAproveContract()}
                className="flex-1 bg-primary/10 border border-primary/30"
              >
                {loadingAprove ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <BsPatchCheckFill />
                )}
                Aprove
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
