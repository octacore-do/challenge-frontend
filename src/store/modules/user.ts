import { defineStore } from "pinia";
import { computed, ref, onMounted } from "vue";
import { useFetch } from "@vueuse/core";
import { formFormatUrl } from "../..//utils/postForm";
import type { AuthLoginResponse, EmailLoginResponse } from "../types/http";
import type { UserState } from "../types/store";

interface LoginParams {
  email: string;
  otp: string;
}

export const useUserStore = defineStore("user-app", () => {
  // const localData = useStorage<UserState>(
  //   "user-app",
  //   {
  //     email: null,
  //     password: null,
  //     token: null,
  //   },
  //   localStorage,
  //   { mergeDefaults: true }
  // );

  const localData = ref<UserState | null>(null);

  const getOTPByEmail = async (payload: string) => {
    const body = formFormatUrl(payload);
    const { error, data, isFinished } = await useFetch<EmailLoginResponse>(
      "/api.octacore.do/api/otp",
      {
        beforeFetch({ options }) {
          options.headers = {
            "Content-Type": "application/json",
          };
        },
      }
    )
      .post(body)
      .json<EmailLoginResponse>();

    if (isFinished.value && !error.value) {
      if (data.value?.success == "true") return true;
      // await getTokenByOTP();
      else return false;
    }
    return false;
  };

  const getTokenByOTP = async (payload: LoginParams) => {
    const body = formFormatUrl(payload);

    const { error, data, isFinished } = await useFetch<AuthLoginResponse>(
      "/api.octacore.do/api/otp/validation",
      {
        beforeFetch({ options }) {
          options.headers = {
            "Content-Type": "application/json",
          };
        },
      }
    )
      .post(body)
      .json<AuthLoginResponse>();

    if (isFinished.value && !error.value) {
      if (data.value?.success == "true") return true;
      else return false;
    }
    return false;
  };

  const logout = () => {
    //   localData.value.token = null;
    //   localData.value = null;
    localData.value = null;
  };

  const getToken = () => localData.value?.token;

  return {
    getOTPByEmail,
    getTokenByOTP,
    getToken,
    logout,
    localData,
  };
});
