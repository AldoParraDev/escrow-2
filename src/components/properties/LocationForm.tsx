import {
  FaLocationArrow,
  FaMap,
  FaRegBuilding,
  FaRegMap,
} from "react-icons/fa";
import { FiHash } from "react-icons/fi";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import PropertyMap from "./PropertyMap";
import { Location } from "./EditProperty";

interface Props {
  locationData: Location;
  setLocationData: React.Dispatch<React.SetStateAction<Location>>;
}

export default function LocationForm({ locationData, setLocationData }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const handleChange = (field: keyof Location, value: string | number) => {
    setLocationData({
      ...locationData,
      [field]: value,
    });
  };
  return (
    <ScrollArea className="h-[calc(100vh-210px)] w-full">
      <div className="grid grid-cols-1 gap-4 w-full">
        {/* BASIC INFORMATION */}
        <div className="w-full rounded-b-xl bg-white p-5 flex flex-col gap-4 border border-t-0">
          <h2 className="flex items-center gap-2 text-primary font-bold text-lg">
            <FaLocationArrow className="size-5" />
            Property Address
          </h2>

          <div className="flex-col gap-1 hidden">
            <div className="relative">
              <Input
                placeholder="Search address..."
                className="peer ps-9 h-12 placeholder:text-content/60"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <Search size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <IoLocationOutline className="text-primary/80" />
              Address Line 1 *
            </label>
            <Input
              placeholder="Street Address"
              className="h-12 placeholder:text-content/60"
              value={locationData.address1}
              onChange={(e) => handleChange("address1", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-content font-normal">
              <IoLocationOutline className="text-primary/80" />
              Address Line 2
            </label>
            <Input
              placeholder="Apt, Suite, etc. (Optional)"
              className="h-12 placeholder:text-content/60"
              value={locationData.address2}
              onChange={(e) => handleChange("address2", e.target.value)}
            />
          </div>

          <div className="w-full grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <FaRegBuilding className="text-primary/80" />
                City *
              </label>
              <Input
                placeholder="City"
                className="h-12 placeholder:text-content/60"
                value={locationData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <FaRegMap className="text-primary/80" />
                State *
              </label>
              <Input
                placeholder="State"
                className="h-12 placeholder:text-content/60"
                value={locationData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2 text-content font-normal">
                <FiHash className="text-primary/80" />
                ZIP *
              </label>
              <Input
                placeholder="ZIP"
                className="h-12 placeholder:text-content/60"
                value={locationData.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-full rounded-xl bg-white p-5 flex flex-col gap-4 border">
          <h2 className="flex items-center gap-2 text-orange-400 font-bold text-lg">
            <FaMap className="size-5" />
            Pin Location
          </h2>

          <p className="text-content font-normal leading-[1.2]">
            Move the map to position the pin ar the exact location
          </p>

          <PropertyMap apiKey={apiKey} />
        </div>
      </div>
    </ScrollArea>
  );
}
