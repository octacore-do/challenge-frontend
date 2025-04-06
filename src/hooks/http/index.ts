import { createFetch } from "@vueuse/core";
import { useUserStore } from "../../store/modules/user";

export const useMyFetch = createFetch({
  options: {
    beforeFetch({ options, cancel }) {
      const useUser = useUserStore();
      const token = useUser.getToken;
      if (!token) {
        cancel();
        return;
      }
      options.headers = {
        Authorization: `Bearer ${token}`,
      };

      if (options.method === "POST" || options.method === "PUT") {
        options.headers["Content-Type"] = "application/json";
      }

      return { options };
    },
  },
  fetchOptions: {
    mode: "cors",
  },
});
