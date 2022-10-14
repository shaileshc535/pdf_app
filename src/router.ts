import {
  hashLocationPlugin,
  ReactStateDeclaration,
  servicesPlugin,
  UIRouterReact,
} from "@uirouter/react";

export const router = new UIRouterReact();

const states: ReactStateDeclaration[] = [
  {
    url: "/",
    name: "login.**",
    lazyLoad: () => import("./screens/Authentication/LoginPage"),
  },
  {
    url: "/register",
    name: "register.**",
    lazyLoad: () => import("./screens/Authentication/Register"),
  },
  {
    url: "/home",
    name: "home.**",
    lazyLoad: () => import("./screens/Pdf/Home"),
  },
  {
    url: "/dashboard",
    name: "dashboard.**",
    lazyLoad: () => import("./screens/Pdf/Dashboard"),
  },
];

states.forEach((state) => router.stateRegistry.register(state));

router.urlRouter.otherwise("/");
router.plugin(hashLocationPlugin);
router.plugin(servicesPlugin);

export const $state = router.stateService;
export const $transition = router.transitionService;
