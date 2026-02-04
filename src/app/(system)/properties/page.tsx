import CreateProperty from "@/components/properties/CreateProperty";
import { PropertiesList } from "@/components/properties/PropertiesList";
import api from "@/lib/axios";
import { Property } from "@/types/property";
import { HiBuildingOffice2 } from "react-icons/hi2";

export default async function PropertiesPage() {
  let list_properties: Property[] = [];

  try {
    const response = await api.get("/properties", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    list_properties = response.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="bg-[#F7F8FA] px-3 flex flex-col gap-4 pt-[20px] pb-[90px] sm:px-8 xl:pb-[40px] 2xl:px-[8rem]">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-primary text-[1.75rem] leading-[1] xl:text-4xl 2xl:text-5xl">
          Properties
        </h1>
        <span className="flex items-center gap-1 font-medium text-primary/70 text-sm xl:text-lg">
          <HiBuildingOffice2 className="size-4 xl:size-6" />
          {list_properties.length} properties
        </span>
      </div>

      {/* Usa el componente cliente con la lógica de búsqueda */}
      <PropertiesList properties={list_properties} />

      <CreateProperty />
    </div>
  );
}
