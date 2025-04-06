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
      const body = formFormatUrl(payload);

      const { error, data, isFinished } = await useFetch<AuthLoginResponse>(
        "/api/v1/login/access-token",
        {
          beforeFetch({ options }) {
            options.headers = {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            };
          },
        }
      )
        .post(body)
        .json<AuthLoginResponse>();

      if (isFinished.value && !error.value) {
        this.data.token = data.value?.access_token;

        await this.loadMe();

        return !!this.data.userInfo;
      }

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

      const response = await meFetch.get().json<UserInfo>();

      if (!response.canAbort.value && response.statusCode.value === 200) {
        const user: UserInfo | null = response.data.value;
        if (user) {
          user.password = "";
        }
        this.data.userInfo = user;
      } else {
        this.data.userInfo = null;
      }
    },

    async fetchUsers() {
      const self = this;
      const meFetch = useFetch<UserInfo>("/api/v1/users", {
        beforeFetch({ options, cancel }) {
          const token = self.data.token;
          if (!token) {
            cancel();
            return;
          }
          options.headers = {
            Authorization: `Bearer ${token}`,
          };

          return { options };
        },
      });

      const response = await meFetch.get().json<UserInfo[]>();

      if (!response.canAbort.value && response.statusCode.value === 200) {
        this.users = response.data.value;
      } else {
        this.users = null;
      }
    },

    async postUser(payload: UserInfo) {
      const self = this;
      const meFetch = useFetch<UserInfo>("/api/v1/users/", {
        beforeFetch({ options, cancel }) {
          const token = self.data.token;
          if (!token) {
            cancel();
            return;
          }
          options.headers = {
            Authorization: `Bearer ${token}`,
          };

          return { options };
        },
      });

      const response = await meFetch.post(payload).json<UserInfo>();

      if (!response.canAbort.value && response.statusCode.value === 200) {
        this.users?.push(response.data.value!);
        return response.data.value;
      } else {
        this.users = null;
      }
    },

    async updateUser(payload: UserInfo, id: number) {
      const self = this;
      const meFetch = useFetch<UserInfo>(`/api/v1/users/${id}`, {
        beforeFetch({ options, cancel }) {
          const token = self.data.token;
          if (!token) {
            cancel();
            return;
          }
          options.headers = {
            Authorization: `Bearer ${token}`,
          };

          return { options };
        },
      });

      const response = await meFetch.put(payload).json<UserInfo>();

      if (!response.canAbort.value && response.statusCode.value === 200) {
        if (response.data.value) {
          this.users?.forEach((item, index) =>
            item.id === payload.id ? this.users?.splice(index, 1) : null
          );
          this.users?.push(response.data.value);
        }
      } else {
        this.users = null;
      }
    },
    async updateUserPassword(payload: PasswordUpdate) {
      const self = this;
      const meFetch = useFetch<UserInfo>(`/api/v1/users/update-password/`, {
        beforeFetch({ options, cancel }) {
          const token = self.data.token;
          if (!token) {
            cancel();
            return;
          }
          options.headers = {
            Authorization: `Bearer ${token}`,
          };

          return { options };
        },
      });

      const response = await meFetch.put(payload).json<UserInfo>();

      if (!response.canAbort.value && response.statusCode.value === 200) {
        return response.data.value;
      } else {
        this.users = null;
      }
    },
  },
});
