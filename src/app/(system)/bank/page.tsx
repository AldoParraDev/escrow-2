"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth.store";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlaidLink } from "react-plaid-link";
import { HiCheckCircle, HiBuildingLibrary } from "react-icons/hi2";

type CreatePlaidLinkResponse = {
  link_token: string;
  expiration: string;
  request_id: string;
};

export default function BankPage() {
  const router = useRouter();
  const { userLoggedIn, bankLinked, setBankLinked } = useAuthStore();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const openAfterTokenRef = useRef(false);

  const fetchLinkToken = useCallback(async () => {
    const userId = userLoggedIn?.user_id;
    if (!userId) return;
    setError(null);
    setLoading(true);
    try {
      const { data } = await api.post<CreatePlaidLinkResponse>("/create_plaid_link", {
        user_id: userId,
      });
      setLinkToken(data.link_token);
      openAfterTokenRef.current = true;
    } catch (err: unknown) {
      const msg =
        typeof (err as { response?: { data?: { message?: string } } })?.response?.data?.message === "string"
          ? (err as { response: { data: { message: string } } }).response.data.message
          : err instanceof Error
            ? err.message
            : "Failed to create Plaid link";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [userLoggedIn?.user_id]);

  const onSuccess = useCallback(
    async (publicToken: string) => {
      const userId = userLoggedIn?.user_id;
      if (!userId) return;
      setError(null);
      setLoading(true);
      try {
        await api.post("/exchange_public_token", {
          public_token: publicToken,
          user_id: userId,
        });
        setBankLinked(true);
        setLinkToken(null);
      } catch (err: unknown) {
        const msg =
          typeof (err as { response?: { data?: { message?: string } } })?.response?.data?.message === "string"
            ? (err as { response: { data: { message: string } } }).response.data.message
            : err instanceof Error
              ? err.message
              : "Failed to link bank account";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [userLoggedIn?.user_id, setBankLinked]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
    onExit: () => {
      setLinkToken(null);
      openAfterTokenRef.current = false;
    },
  });

  useEffect(() => {
    if (userLoggedIn?.user_role !== "admin") {
      router.replace("/home");
      return;
    }
  }, [userLoggedIn?.user_role, router]);

  useEffect(() => {
    if (linkToken && ready && openAfterTokenRef.current) {
      openAfterTokenRef.current = false;
      open();
    }
  }, [linkToken, ready, open]);

  if (userLoggedIn?.user_role !== "admin") {
    return null;
  }

  return (
    <div className="bg-[#F7F8FA] px-3 flex flex-col gap-4 pt-[30px] pb-[90px] sm:px-8 xl:pb-[40px] 2xl:px-[8rem]">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-primary text-[1.75rem] leading-[1] xl:text-4xl 2xl:text-5xl">
          Bank
        </h1>
        <span className="flex items-center gap-1 font-medium text-primary/70 text-sm xl:text-lg">
          <HiBuildingLibrary className="size-4 xl:size-6" />
          Link your bank account with Plaid
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bank account</CardTitle>
          <CardDescription>
            Connect your bank securely via Plaid to receive payments and manage escrow.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}
          {bankLinked ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-green-600">
                <HiCheckCircle className="size-5 shrink-0" />
                <span className="font-medium">Your bank account is linked.</span>
              </div>
              <Button
                variant="outline"
                onClick={fetchLinkToken}
                disabled={loading}
              >
                {loading ? "Preparing…" : "Relink bank account"}
              </Button>
            </div>
          ) : (
            <Button
              onClick={fetchLinkToken}
              disabled={loading}
            >
              {loading ? "Preparing…" : "Link bank account"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
