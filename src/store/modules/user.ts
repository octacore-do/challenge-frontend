import type { RemovableRef } from "@vueuse/core";
import { useFetch, useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { formFormatUrl } from "../..//utils/postForm";
import type { AuthLoginResponse } from "../types/http";
import type { UserInfo } from "../types/store";

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

interface PasswordUpdate {
  id: number;
  current_password: string;
  new_password: string;
  confirm_password: string;
}

interface DataUserState {
  users: UserInfo[] | null;
  data: RemovableRef<UserState>;
}

interface LoginParams {
  username: string;
  password: string;
}

export const useUserStore = defineStore("user-app", {
  state: (): DataUserState => ({
    users: null,
    data: useStorage<UserState>(
      "user-app",
      {
        // user info
        userInfo: null,
        // token
        token: undefined,
        // Whether the login expired
        sessionTimeout: false,
        // Last fetch time
        lastUpdateTime: 0,
      },
      localStorage,
      {
        mergeDefaults: true,
      }
    ),
  }),
  getters: {
    getUserInfo(state): Nullable<UserInfo> {
      return state.data.userInfo;
    },
    getToken(state): string {
      return state.data.token! || "";
    },
    getSessionTimeout(state): boolean {
      return !!state.data.sessionTimeout;
    },
    getUserById(state) {
      return (id: number) => state.users?.find((user) => user.id === id);
    },
  },
  actions: {
    async login(payload: LoginParams) {
      // const body = formFormatUrl(payload);

      // const { error, data, isFinished } = await useFetch<AuthLoginResponse>(
      //   "/api/v1/user_platform/credentials",
      //   {
      //     beforeFetch({ options }) {
      //       options.headers = {
      //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      //       };
      //     },
      //   }
      // )
      //   .post(body)
      //   .json<AuthLoginResponse>();

      // if (isFinished.value && !error.value) {
      // this.data.token = data.value?.access_token;
      this.data.token = "cambia la funcion en el store del user";
      //flow commmented in case the userInfo feature is needed
      // await this.loadMe();
      // return !!this.data.userInfo;
      return !!this.data.token;
      // }

      return false;
    },
    logout() {
      this.data.token = undefined;
      this.data.userInfo = null;
    },
    async loadMe() {
      const self = this;
      const meFetch = useFetch<UserInfo>("/api/v1/users/me", {
        beforeFetch({ options, cancel }) {
          const token = self.data.token;
          if (!token) {
            cancel();
            return;
          }
          options.headers = {
            Authorization: `Bearer ${token}`,
          };

          if (options.method == "POST") {
            options.headers["Content-Type"] =
              "application/x-www-form-urlencoded;charset=UTF-8";
          }

          return { options };
        },
      });

      // const response = await meFetch.get().json<UserInfo>();

      const responseUserValue: UserInfo = {
        id: 123132,
        full_name: "kakato",
        email: "string",
        is_active: true,
        is_superuser: true,
        user_type: 8,
        password: "string",
      };

      // if (!response.canAbort.value && response.statusCode.value === 200) {
      if (responseUserValue) {
        // const user: UserInfo | null = response.data.value;
        const user: UserInfo | null = responseUserValue;
        if (user) {
          user.password = "";
        }
        this.data.userInfo = user;
      } else {
        this.data.userInfo = null;
      }
    },
  },
});
