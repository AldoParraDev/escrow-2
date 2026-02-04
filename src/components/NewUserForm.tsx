import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { toast } from "sonner";

interface Props {
  onLoading: () => void;
  onCancel: () => void;
  type: string;
}

export default function NewUserForm({ onLoading, onCancel, type }: Props) {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  const isFormValid = firstname && lastname && email;

  const clear = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPhone("");
    setCompany("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const userData = {
      username: `${firstname}.${lastname}`,
      user_email: email,
      password_hash: "",
      user_role: type,
      user_first_name: firstname,
      user_last_name: lastname,
      user_phone1: phone,
      user_phone2: null,
      user_address1: null,
      user_address2: null,
      user_city: null,
      user_state: null,
      user_postal_code: null,
      user_company: company,
      user_device_id: "",
      user_license: "",
      user_confirmed: "Y",
    };

    const response = await api.post("/users", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success(response.data.message, {
      position: "top-right",
      duration: 5000,
    });

    clear();

    onLoading();
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstname">First Name *</Label>
            <Input
              id="firstname"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastname">Last Name *</Label>
            <Input
              id="lastname"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-4"
            disabled={!isFormValid}
          >
            Create {type}
          </Button>
        </div>

        <div>
          <Button
            className="w-full mt-4"
            variant={"outline"}
            onClick={() => {
              onCancel();
              clear();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
