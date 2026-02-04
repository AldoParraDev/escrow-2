import { LoginForm } from "@/components/login/LoginForm";
import Image from "next/image";
import bg_login from "@/assets/placeholder.svg";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-[#F7F8FA]">
      <div className="flex flex-col gap-4 py-6 px-12 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={bg_login}
          width={500}
          height={500}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

