import { formatToShortDate } from "@/lib/utils";
import { Property } from "@/types/property";
import { ChevronRight } from "lucide-react";
import {
  FaCheckCircle,
  FaLocationArrow,
  FaRegCalendarAlt,
} from "react-icons/fa";

interface Props {
  property: Property;
  handlePropertySelected: (property: Property) => void;
}

export default function PropertyCard({
  property,
  handlePropertySelected,
}: Props) {
  return (
    <div
      className="w-full border rounded-xl bg-white p-4 flex flex-col gap-4 relative shadow-[24px_20px_35px_-31px_rgba(37,51,131,0.10)]"
      onClick={() => handlePropertySelected(property)}
    >
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-primary font-bold text-xl xl:text-2xl">
            {property.property_name}
          </h2>
          <span className="text-content text-base font-medium leading-[1] xl:text-lg">
            {property.property_address1}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <b className="text-primary font-bold text-2xl xl:text-3xl">
            ${property.property_rental_amount}
          </b>
          <span className="text-xs text-content font-normal">per month</span>
        </div>
      </div>

      <div className="w-full flex items-center justify-start gap-2">
        <FaLocationArrow className="text-primary size-3" />
        <p className="text-content text-base leading-[1] xl:text-lg">
          {property.property_city}, {property.property_state},{" "}
          {property.property_postal_code}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center gap-1 px-2 py-1 border border-green-300 bg-green-100 text-green-500 rounded-md">
          <FaCheckCircle className="size-3 xl:size-4" />
          <span className="text-xs leading-[1] xl:text-lg">
            {property.property_status}
          </span>
        </div>

        <p className="text-content text-sm flex items-center gap-2 leading-[1] xl:text-lg">
          <FaRegCalendarAlt /> Added {formatToShortDate(property.created_at)}
        </p>
      </div>

      <span className="absolute right-4 bottom-4">
        <ChevronRight className="text-primary/80" />
      </span>
    </div>
  );
}
