import { PAGE_NOT_FOUND_NAME } from "../constant";

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE = {
  path: "/:path(.*)*",
  name: PAGE_NOT_FOUND_NAME,
  component: "",
  meta: {
    title: "ErrorPage",
  },
};
