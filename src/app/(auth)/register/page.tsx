import { RegisterForm } from "@/components/register/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-[#F7F8FA]">
      <div className="flex flex-col gap-4 py-6 px-8 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/img/placeholder-login.svg"
          width={500}
          height={500}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
