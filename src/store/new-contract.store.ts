import { create } from "zustand";

interface NewContractStore {
  // step 1
  landlordId: string;
  tenantId: string;
  propertyId: string;
  isRented: boolean;
  leaseStartDate: Date;
  leaseEndDate: Date;
  leaseAgreementDueBy: Date;
  leasePreparedBy: string;
  cooperatingBroker: string;
  cooperatingBrokerType: string;
  setLandlordId: (id: string) => void;
  setTenantId: (id: string) => void;
  setPropertyId: (id: string) => void;
  setIsRented: (state: boolean) => void;
  setLeaseStartDate: (date: Date) => void;
  setLeaseEndDate: (date: Date) => void;
  setLeaseAgreementDueBy: (date: Date) => void;
  setLeasePreparedBy: (name: string) => void;
  setCooperatingBroker: (id: string) => void;
  setCooperatingBrokerType: (type: string) => void;

  // step 2
  firstMonthRent: number;
  firstMonthDueOn: Date;
  advanceRentMonth: Date;
  advanceRent: number;
  advanceRentDueOn: Date;
  lastMonthRent: number;
  lastMonthDueOn: Date;
  securityDeposit: number;
  securityDepositDueOn: Date;
  securityDepositAssociation: number;
  securityDepositAssociationDueOn: Date;
  rentsafeDeposit: number;
  petDeposit: number;
  petDepositDueOn: Date;
  petDepositRefundable: boolean;
  setFirstMonthRent: (amount: number) => void;
  setFirstMonthDueOn: (date: Date) => void;
  setAdvanceRentMonth: (date: Date) => void;
  setAdvanceRent: (amount: number) => void;
  setAdvanceRentDueOn: (date: Date) => void;
  setLastMonthRent: (amount: number) => void;
  setLastMonthDueOn: (date: Date) => void;
  setSecurityDeposit: (amount: number) => void;
  setSecurityDepositDueOn: (date: Date) => void;
  setSecurityDepositAssociation: (amount: number) => void;
  setSecurityDepositAssociationDueOn: (date: Date) => void;
  setRentsafeDeposit: (amount: number) => void;
  setPetDeposit: (amount: number) => void;
  setPetDepositDueOn: (date: Date) => void;
  setPetDepositRefundable: (state: boolean) => void;

  // step 3
  toFirstMonthRent: number;
  toLastMonthRent: number;
  toSecurityDeposit: number;
  toOther: number;
  totalRent: number;
  tenantWillPay: string;
  dayOfEachmonth: string;
  monthlyRent: number;
  paymentDate: Date;
  paymentTotalAmount: number;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  petsCondition: string;
  setToFirstMonthRent: (amount: number) => void;
  setToLastMonthRent: (amount: number) => void;
  setToSecurityDeposit: (amount: number) => void;
  setToOther: (amount: number) => void;
  setTotalRent: (amount: number) => void;
  setTenantWillPay: (amount: string) => void;
  setDayOfEachmonth: (amount: string) => void;
  setMonthlyRent: (amount: number) => void;
  setPaymentDate: (date: Date) => void;
  setPaymentTotalAmount: (amount: number) => void;
  setPetsAllowed: (state: boolean) => void;
  setSmokingAllowed: (state: boolean) => void;
  setPetsCondition: (amount: string) => void;

  // step 4
  utilitiesExeption: string;
  associationDeposit: number;
  associationFees: number;
  associationAppDue: Date;
  tenantPaysAssociationFee: boolean;
  serviceMemberTenant: boolean;
  maintenanceException: string;
  additionalTerms: string;
  setUtilitiesExeption: (amount: string) => void;
  setAssociationDeposit: (amount: number) => void;
  setAssociationFees: (amount: number) => void;
  setAssociationAppDue: (date: Date) => void;
  setTenantPaysAssociationFee: (state: boolean) => void;
  setServiceMemberTenant: (state: boolean) => void;
  setMaintenanceException: (amount: string) => void;
  setAdditionalTerms: (amount: string) => void;

  // validations
  isStepReady: (step: number) => boolean;
  getMissingFieldsByStep: (step: number) => string[];
  isReadyToCreate: () => boolean;
  resetContract: () => void;
}

const requiredFieldsByStep: Record<
  number,
  { key: keyof NewContractStore; label: string }[]
> = {
  1: [
    { key: "landlordId", label: "Landlord" },
    { key: "tenantId", label: "Tenant" },
    { key: "propertyId", label: "Property" },
    { key: "leaseStartDate", label: "Lease start date" },
    { key: "leaseEndDate", label: "Lease end date" },
  ],
  2: [
    // { key: "firstMonthRent", label: "First month rent" },
    // { key: "advanceRent", label: "Advance rent" },
    // { key: "lastMonthRent", label: "Last month rent" },
    // { key: "securityDeposit", label: "Security deposit" },
    // {
    //   key: "securityDepositAssociation",
    //   label: "Security deposit association",
    // },
    { key: "rentsafeDeposit", label: "Initial escrow deposit" },
    // { key: "petDeposit", label: "Pet deposit" },
  ],
  3: [
    // { key: "toFirstMonthRent", label: "To first month rent" },
    // { key: "toLastMonthRent", label: "To last month rent" },
    // { key: "toSecurityDeposit", label: "To security deposit" },
    // { key: "toOther", label: "To other" },
    { key: "totalRent", label: "Total rent" },
    { key: "tenantWillPay", label: "Tenant will pay" },
    { key: "petsAllowed", label: "Pets allowed" },
    { key: "smokingAllowed", label: "Smoking allowed" },
    // condicionales (se validan aparte en runtime)
    { key: "dayOfEachmonth", label: "Day of each month" },
    { key: "monthlyRent", label: "Monthly rent" },
    { key: "paymentDate", label: "Payment date" },
    { key: "paymentTotalAmount", label: "Payment total amount" },
    { key: "petsCondition", label: "Pets condition" },
  ],
  4: [
    // { key: "utilitiesExeption", label: "Utilities exeption" },
    // { key: "associationDeposit", label: "Association deposit" },
    // { key: "associationAppDue", label: "Association app due" },
  ],
};

function isValidValue(value: unknown): boolean {
  if (typeof value === "string") return value.trim() !== "";
  if (typeof value === "number") return value !== 0;
  if (value instanceof Date) return !isNaN(value.getTime());
  return value !== null && value !== undefined;
}

export const useNewContractStore = create<NewContractStore>((set, get) => ({
  // step 1
  landlordId: "",
  tenantId: "",
  propertyId: "",
  isRented: false,
  leaseStartDate: new Date(),
  leaseEndDate: new Date(new Date().setMonth(new Date().getMonth() + 12)),
  leaseAgreementDueBy: new Date(),
  leasePreparedBy: "landlord",
  cooperatingBroker: "",
  cooperatingBrokerType: "T",
  setLandlordId: (id) => set({ landlordId: id }),
  setTenantId: (id) => set({ tenantId: id }),
  setPropertyId: (id) => set({ propertyId: id }),
  setIsRented: (state) => set({ isRented: state }),
  setLeaseStartDate: (date) => set({ leaseStartDate: date }),
  setLeaseEndDate: (date) => set({ leaseEndDate: date }),
  setLeaseAgreementDueBy: (date) => set({ leaseAgreementDueBy: date }),
  setLeasePreparedBy: (name) => set({ leasePreparedBy: name }),
  setCooperatingBroker: (id) => set({ cooperatingBroker: id }),
  setCooperatingBrokerType: (type) => set({ cooperatingBrokerType: type }),

  // step 2
  firstMonthRent: 0,
  firstMonthDueOn: new Date(),
  advanceRentMonth: new Date(),
  advanceRent: 0,
  advanceRentDueOn: new Date(),
  lastMonthRent: 0,
  lastMonthDueOn: new Date(),
  securityDeposit: 0,
  securityDepositDueOn: new Date(),
  securityDepositAssociation: 0,
  securityDepositAssociationDueOn: new Date(),
  rentsafeDeposit: 0,
  petDeposit: 0,
  petDepositDueOn: new Date(),
  petDepositRefundable: false,
  setFirstMonthRent: (amount) => set({ firstMonthRent: amount }),
  setFirstMonthDueOn: (date) => set({ firstMonthDueOn: date }),
  setAdvanceRentMonth: (date) => set({ advanceRentMonth: date }),
  setAdvanceRent: (amount) => set({ advanceRent: amount }),
  setAdvanceRentDueOn: (date) => set({ advanceRentDueOn: date }),
  setLastMonthRent: (amount) => set({ lastMonthRent: amount }),
  setLastMonthDueOn: (date) => set({ lastMonthDueOn: date }),
  setSecurityDeposit: (amount) => set({ securityDeposit: amount }),
  setSecurityDepositDueOn: (date) => set({ securityDepositDueOn: date }),
  setSecurityDepositAssociation: (date) =>
    set({ securityDepositAssociation: date }),
  setSecurityDepositAssociationDueOn: (amount) =>
    set({ securityDepositAssociationDueOn: amount }),
  setRentsafeDeposit: (amount) => set({ rentsafeDeposit: amount }),
  setPetDeposit: (amount) => set({ petDeposit: amount }),
  setPetDepositDueOn: (date) => set({ petDepositDueOn: date }),
  setPetDepositRefundable: (state) => set({ petDepositRefundable: state }),

  // step 3
  toFirstMonthRent: 0,
  toLastMonthRent: 0,
  toSecurityDeposit: 0,
  toOther: 0,
  totalRent: 0,
  tenantWillPay: "full",
  dayOfEachmonth: "",
  monthlyRent: 0,
  paymentDate: new Date(),
  paymentTotalAmount: 0,
  petsAllowed: false,
  smokingAllowed: false,
  petsCondition: "",
  setToFirstMonthRent: (amount) => set({ toFirstMonthRent: amount }),
  setToLastMonthRent: (amount) => set({ toLastMonthRent: amount }),
  setToSecurityDeposit: (amount) => set({ toSecurityDeposit: amount }),
  setToOther: (amount) => set({ toOther: amount }),
  setTotalRent: (amount) => set({ totalRent: amount }),
  setTenantWillPay: (amount) => set({ tenantWillPay: amount }),
  setDayOfEachmonth: (amount) => set({ dayOfEachmonth: amount }),
  setMonthlyRent: (amount) => set({ monthlyRent: amount }),
  setPaymentDate: (date) => set({ paymentDate: date }),
  setPaymentTotalAmount: (amount) => set({ paymentTotalAmount: amount }),
  setPetsAllowed: (state) => set({ petsAllowed: state }),
  setSmokingAllowed: (state) => set({ smokingAllowed: state }),
  setPetsCondition: (state) => set({ petsCondition: state }),

  // step 4
  utilitiesExeption: "",
  associationDeposit: 0,
  associationFees: 0,
  associationAppDue: new Date(),
  tenantPaysAssociationFee: false,
  serviceMemberTenant: false,
  maintenanceException: "",
  additionalTerms: "",
  setUtilitiesExeption: (amount) => set({ utilitiesExeption: amount }),
  setAssociationDeposit: (amount) => set({ associationDeposit: amount }),
  setAssociationFees: (amount) => set({ associationFees: amount }),
  setAssociationAppDue: (date) => set({ associationAppDue: date }),
  setTenantPaysAssociationFee: (state) =>
    set({ tenantPaysAssociationFee: state }),
  setServiceMemberTenant: (state) => set({ serviceMemberTenant: state }),
  setMaintenanceException: (amount) => set({ maintenanceException: amount }),
  setAdditionalTerms: (amount) => set({ additionalTerms: amount }),

  isStepReady: (step) => {
    const state = get();
    const baseValid = requiredFieldsByStep[step]
      .filter(({ key }) => {
        // Excluir condicionales que no aplican
        if (key === "dayOfEachmonth" || key === "monthlyRent") {
          return state.tenantWillPay === "monthly";
        }
        if (key === "paymentDate" || key === "paymentTotalAmount") {
          return state.tenantWillPay === "full";
        }
        if (key === "petsCondition") {
          return state.petsAllowed === true;
        }
        return true;
      })
      .every(({ key }) => isValidValue(state[key]));
    return baseValid;
  },

  getMissingFieldsByStep: (step) => {
    const state = get();
    return requiredFieldsByStep[step]
      .filter(({ key }) => {
        if (key === "dayOfEachmonth" || key === "monthlyRent") {
          return state.tenantWillPay === "monthly" && !isValidValue(state[key]);
        }
        if (key === "paymentDate" || key === "paymentTotalAmount") {
          return state.tenantWillPay === "full" && !isValidValue(state[key]);
        }
        if (key === "petsCondition") {
          return state.petsAllowed === true && !isValidValue(state[key]);
        }
        return !isValidValue(state[key]);
      })
      .map(({ label }) => label);
  },

  isReadyToCreate: () => {
    return [1, 2, 3, 4].every((step) => get().isStepReady(step));
  },

  resetContract: () =>
    set({
      // Step 1
      landlordId: "",
      tenantId: "",
      propertyId: "",
      isRented: false,
      leaseStartDate: new Date(),
      leaseEndDate: new Date(),
      leaseAgreementDueBy: new Date(),
      leasePreparedBy: "landlord",

      // Step 2
      firstMonthRent: 0,
      firstMonthDueOn: new Date(),
      advanceRentMonth: new Date(),
      advanceRent: 0,
      advanceRentDueOn: new Date(),
      lastMonthRent: 0,
      lastMonthDueOn: new Date(),
      securityDeposit: 0,
      securityDepositDueOn: new Date(),
      securityDepositAssociation: 0,
      securityDepositAssociationDueOn: new Date(),
      rentsafeDeposit: 0,
      petDeposit: 0,
      petDepositDueOn: new Date(),
      petDepositRefundable: false,

      // Step 3
      toFirstMonthRent: 0,
      toLastMonthRent: 0,
      toSecurityDeposit: 0,
      toOther: 0,
      totalRent: 0,
      tenantWillPay: "full",
      dayOfEachmonth: "",
      monthlyRent: 0,
      paymentDate: new Date(),
      paymentTotalAmount: 0,
      petsAllowed: false,
      smokingAllowed: false,

      // Step 4
      utilitiesExeption: "",
      associationDeposit: 0,
      associationFees: 0,
      associationAppDue: new Date(),
      tenantPaysAssociationFee: false,
      serviceMemberTenant: false,
      maintenanceException: "",
      additionalTerms: "",
    }),
}));
