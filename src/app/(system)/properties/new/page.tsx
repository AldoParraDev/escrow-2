"use client";

import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, Loader2 } from "lucide-react";
import { FaBuilding, FaLocationArrow } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { usePropertiesStore } from "@/store/properties";
import { useNewPropertyStore } from "@/store/new-property";
import InfoForm from "@/components/properties/InfoForm";
import LocationForm from "@/components/properties/LocationForm";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface Location {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
}

export interface InfoFormData {
  propertyName: string;
  propertyDescription: string;
  monthlyRent: number;
  brokerId: string;
  landlordId: string;
  tenantId: string;
}

export default function PropertiesNewPage() {
  const { position } = useNewPropertyStore();
  const [tabValue, setTabValue] = useState("tab-1");
  const router = useRouter();

  const [infoData, setInfoData] = useState<InfoFormData>({
    propertyName: "",
    propertyDescription: "",
    monthlyRent: 0,
    brokerId: "",
    landlordId: "",
    tenantId: "",
  });

  const [locationData, setLocationData] = useState<Location>({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    latitude: position.lat,
    longitude: position.lng,
  });

  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
  const { setReloadData, reloadData } = usePropertiesStore();

  const sendData = async () => {
    setLoadingCreate(true);

    if (
      infoData.propertyName === "" ||
      infoData.monthlyRent === 0 ||
      infoData.brokerId === "" ||
      infoData.landlordId === "" ||
      locationData.address1 === "" ||
      locationData.city === "" ||
      locationData.state === "" ||
      locationData.zip === ""
    ) {
      toast.error("Please fill in all the required fields", {
        position: "top-right",
        duration: 3000,
      });
      setLoadingCreate(false);
      return;
    }

    const response = await api.post("/properties", {
      property_name: infoData.propertyName,
      property_description: infoData.propertyDescription,
      property_rental_amount: infoData.monthlyRent,
      property_address1: locationData.address1,
      property_address2: locationData.address2,
      property_city: locationData.city,
      property_state: locationData.state,
      property_postal_code: locationData.zip,
      property_xcoord: String(position.lat),
      property_ycoord: String(position.lng),
      broker_id: Number(infoData.brokerId),
      landlord_id: Number(infoData.landlordId),
      tenant_id: Number(infoData.tenantId),
      property_status: "Available",
    });

    if (response.status === 200) {
      toast.success("Property created successfully", {
        position: "top-right",
        duration: 3000,
      });
      setReloadData(!reloadData);
      clearFields();
      router.push("/properties");
    } else {
      toast.error("Error creating property", {
        position: "top-right",
        duration: 3000,
      });
    }

    setLoadingCreate(false);
  };

  const clearFields = () => {
    setInfoData({
      propertyName: "",
      propertyDescription: "",
      monthlyRent: 0,
      brokerId: "",
      landlordId: "",
      tenantId: "",
    });
    setLocationData({
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      latitude: 40.7128,
      longitude: -74.006,
    });
  };
  return (
    <div className="bg-[#F7F8FA] px-3 flex flex-col gap-4 pt-[20px] pb-[130px] sm:px-8 xl:pb-[40px] 2xl:px-[8rem]">
      <div className="!max-h-screen">
        <div className="pt-2 pb-0 flex justify-between flex-col border-b">
          <div className="w-full flex items-center justify-between">
            <Link
              href="/properties"
              className="border-none bg-primary/10 text-primary rounded-full text-base !pl-2 !pr-4 flex items-center gap-2 py-2"
              onClick={() => {
                clearFields();
              }}
            >
              <ChevronLeft className="size-5" /> Cancel
            </Link>
            <h1 className="text-primary font-bold text-xl">Add Property</h1>
            <Button
              variant={"outline"}
              className="border-none bg-primary text-white rounded-full text-base !pl-3 !pr-4"
              onClick={sendData}
            >
              {loadingCreate ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Check className="size-5" />
              )}
              Save
            </Button>
          </div>

          <div className="w-full mt-6">
            <Tabs onValueChange={setTabValue} value={tabValue}>
              <ScrollArea>
                <TabsList className="text-foreground h-auto gap-2 rounded-none bg-transparent px-0 py-1 w-full">
                  <TabsTrigger
                    value="tab-1"
                    className="hover:bg-accent text-content hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none text-base data-[state=active]:font-bold"
                  >
                    <FaBuilding
                      className="-ms-0.5 me-1.5"
                      size={16}
                      aria-hidden="true"
                    />
                    Property Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="tab-2"
                    className="hover:bg-accent text-content hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none text-base data-[state=active]:font-bold"
                  >
                    <FaLocationArrow
                      className="-ms-0.5 me-1.5"
                      size={16}
                      aria-hidden="true"
                    />
                    Location
                  </TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </Tabs>
          </div>
        </div>
        <div className="bg-[#F7F8FA] w-full h-full p-0">
          {tabValue === "tab-1" && (
            <InfoForm infoData={infoData} setInfoData={setInfoData} />
          )}
          {tabValue === "tab-2" && (
            <LocationForm
              locationData={locationData}
              setLocationData={setLocationData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
