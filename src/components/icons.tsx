import {
  GitHubLogoIcon,
  SunIcon,
  MoonIcon,
  PersonIcon,
  HeartIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  HamburgerMenuIcon,
  GearIcon,
  RocketIcon,
  ExitIcon,
  LayersIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import {
  type ForwardRefExoticComponent,
  type RefAttributes,
  type SVGAttributes,
} from "react";

interface IconProps extends SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

export type Icon = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

export const Icons = {
  // logo: Command,
  close: Cross2Icon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  search: MagnifyingGlassIcon,
  profile: PersonIcon,
  hamburgerMenu: HamburgerMenuIcon,
  settings: GearIcon,
  rocket: RocketIcon,
  exit: ExitIcon,
  dashboard: LayersIcon,
  check: CheckIcon,
  package: HeartIcon, // update icon
  swords: HeartIcon, // update icon
  moon: MoonIcon,
  sun: SunIcon,
  heart: HeartIcon,
  gitHub: GitHubLogoIcon,
  google: ({ ...props }) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      {...props}
    >
      <path
        fill="currentColor"
        d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"
      ></path>
    </svg>
  ),
  cart: ({ ...props }) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="cart"
      role="img"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      {...props}
    >
      <path
        fill="currentColor"
        d="M28 8.75h-4.75v-0.621c0.003-0.079 0.005-0.173 0.005-0.267 0-3.93-3.186-7.117-7.116-7.117-0.076 0-0.151 0.001-0.226 0.003l0.011-0c-0.039-0.001-0.084-0.001-0.13-0.001-3.895 0-7.052 3.157-7.052 7.052 0 0.119 0.003 0.238 0.009 0.355l-0.001-0.017v0.611h-4.75c-1.794 0.002-3.248 1.456-3.25 3.25v14c0.004 2.898 2.352 5.246 5.25 5.25h20c2.898-0.004 5.246-2.352 5.25-5.25v-14c-0.002-1.794-1.456-3.248-3.25-3.25h-0zM11.25 8.13c-0.009-0.104-0.013-0.226-0.013-0.348 0-2.505 2.031-4.536 4.536-4.536 0.060 0 0.119 0.001 0.179 0.003l-0.009-0c0.068-0.004 0.148-0.006 0.228-0.006 2.535 0 4.59 2.055 4.59 4.59 0 0.107-0.004 0.214-0.011 0.32l0.001-0.014v0.611h-9.5zM28.75 26c-0.002 1.518-1.232 2.748-2.75 2.75h-20c-1.518-0.002-2.748-1.232-2.75-2.75v-14c0.001-0.414 0.336-0.749 0.75-0.75h4.75v5.75c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-5.75h9.5v5.75c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-5.75h4.75c0.414 0 0.75 0.336 0.75 0.75v0z"
      ></path>
    </svg>
  ),
  spinner: ({ ...props }) => (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      data-prefix="fab"
      data-icon="spinner"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  logo: ({ ...props }) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="logo"
      role="img"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="h-8 w-8"
      {...props}
    >
      <path
        d="M24,31.36H8c-0.75,0-1.36-0.61-1.36-1.36V12c0-0.75,0.61-1.36,1.36-1.36h4.64V6.5
	c0-0.474,0.386-0.86,0.86-0.86h0.64V2.5c0-0.474,0.386-0.86,0.86-0.86h2c0.475,0,0.86,0.386,0.86,0.86v3.14h0.64
	c0.475,0,0.86,0.386,0.86,0.86v4.14H24c0.75,0,1.36,0.61,1.36,1.36v18C25.36,30.75,24.75,31.36,24,31.36z M8,11.36
	c-0.353,0-0.64,0.287-0.64,0.64v18c0,0.353,0.287,0.64,0.64,0.64h16c0.353,0,0.64-0.287,0.64-0.64V12c0-0.353-0.287-0.64-0.64-0.64
	H8z M13.36,10.64h5.28V6.5c0-0.076-0.063-0.14-0.14-0.14h-5c-0.076,0-0.14,0.064-0.14,0.14V10.64z M14.86,5.64h2.28V2.5
	c0-0.076-0.063-0.14-0.14-0.14h-2c-0.076,0-0.14,0.064-0.14,0.14V5.64z M22.083,26.36H9.833c-0.199,0-0.36-0.161-0.36-0.36v-8.938
	c0-0.199,0.161-0.36,0.36-0.36h12.25c0.199,0,0.36,0.161,0.36,0.36V26C22.443,26.199,22.282,26.36,22.083,26.36z M10.193,25.64
	h11.529v-8.217H10.193V25.64z M23,7.36c-0.063,0-0.127-0.017-0.186-0.051l-2.5-1.5c-0.17-0.102-0.226-0.323-0.123-0.494
	s0.322-0.224,0.494-0.124l2.5,1.5c0.17,0.102,0.226,0.323,0.123,0.494C23.241,7.298,23.122,7.36,23,7.36z M24,4.36h-3.5
	c-0.199,0-0.36-0.161-0.36-0.36s0.161-0.36,0.36-0.36H24c0.199,0,0.36,0.161,0.36,0.36C24.36,4.199,24.199,4.36,24,4.36z M20.5,2.86
	c-0.122,0-0.241-0.062-0.309-0.175c-0.103-0.17-0.047-0.392,0.123-0.494l2.5-1.5c0.172-0.101,0.392-0.048,0.494,0.124
	c0.103,0.17,0.047,0.392-0.123,0.494l-2.5,1.5C20.627,2.843,20.563,2.86,20.5,2.86z"
      />
    </svg>
  ),
};
