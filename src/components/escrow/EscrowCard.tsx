import { cn, formatCurrency } from "@/lib/utils";
import { EscrowData } from "@/types/escrow";
import { ChevronRight } from "lucide-react";
import { FaCheckCircle, FaFileArchive, FaPlusCircle } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

interface Props {
  escrow: EscrowData;
  handleEscrowSelected: (escrow: EscrowData) => void;
}

export default function EscrowCard({ escrow, handleEscrowSelected }: Props) {
  return (
    <div
      className="w-full border rounded-xl bg-white p-3 flex flex-col gap-4 relative shadow-[24px_20px_135px_-31px_rgba(37,51,131,0.30)]"
      onClick={() => handleEscrowSelected(escrow)}
    >
      <div className="w-full flex items-center justify-start gap-4">
        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
          {escrow.lease_status.toLowerCase() === "deposit" ? (
            <FaDollarSign className="size-5 text-primary" />
          ) : escrow.lease_status.toLowerCase() === "contract" ? (
            <FaFileArchive className="size-5 text-blue-400" />
          ) : escrow.lease_status.toLowerCase() === "created" ? (
            <FaPlusCircle className="size-5 text-green-400" />
          ) : escrow.lease_status.toLowerCase() === "sent" ? (
            <IoIosSend className="size-5 text-orange-400" />
          ) : (
            <FaCheckCircle className="size-5 text-purple-400" />
          )}
        </div>
        <div className="flex flex-col items-start gap-0">
          <h2 className="text-black font-bold text-base xl:text-2xl">
            {escrow.property_name}
          </h2>
          <span
            className={cn(
              "text-content text-sm font-medium leading-[1] xl:text-lg capitalize",
              escrow.lease_status.toLowerCase() === "deposit"
                ? "text-primary"
                : escrow.lease_status.toLowerCase() === "contract"
                  ? "text-blue-400"
                  : escrow.lease_status.toLowerCase() === "created"
                    ? "text-green-400"
                    : escrow.lease_status.toLowerCase() === "sent"
                      ? "text-orange-400"
                      : "text-purple-400"
            )}
          >
            {escrow.lease_status}
          </span>

          <b className="text-primary font-bold text-lg xl:text-3xl">
            {formatCurrency(escrow.lease_holder_deposit_amount)}
          </b>
        </div>
      </div>

      <span className="absolute right-4 bottom-4">
        <ChevronRight className="text-primary/80" />
      </span>
    </div>
  );
}
