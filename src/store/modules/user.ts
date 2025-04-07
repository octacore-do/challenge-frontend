import { defineStore } from "pinia";
import { computed, ref, onMounted } from "vue";
import { useFetch } from "@vueuse/core";
import type { AuthLoginResponse, EmailLoginResponse } from "../types/http";

export const useUserStore = defineStore("user-app", () => {
  const token = ref<string | null>(null);

  const getOTPByEmail = async (email: string) => {
    const { error, data, isFinished } = await useFetch<EmailLoginResponse>(
      "/api/otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      }
    ).json();

    if (isFinished.value && !error.value) {
      return data.value?.success === true;
    }
    return false;
  };

  const getTokenByOTP = async (payload: { email: string; otp: string }) => {
    const { error, data, isFinished } = await useFetch<AuthLoginResponse>(
      "/api/otp/validation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    ).json<AuthLoginResponse>();

    if (isFinished.value && !error.value) {
      token.value = data.value?.data?.token!;
      return true;
    }
    return false;
  };

  const logout = () => {
    token.value = null;
  };

  const getToken = () => token.value;

  return {
    getOTPByEmail,
    getTokenByOTP,
    getToken,
    logout,
  };
});
