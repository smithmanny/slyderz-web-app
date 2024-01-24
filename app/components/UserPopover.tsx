"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import logoutMutation from "app/actions/mutations/logout";

import {
  loggedInRoutes,
  loggedOutRoutes,
  chefLoggedInRoutes,
} from "app/lib/routes";
import { Button } from "./ui/button";
import { localImageLoader } from "app/lib/utils";

import type { User } from "lucia";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const fetchListItems = (user) => {
  const routes = {
    loggedIn: loggedInRoutes,
    loggedOut: loggedOutRoutes,
    chefLoggedIn: chefLoggedInRoutes,
  };

  // TODO: fix session context
  if (user?.userId && !user?.chef?.isChef) {
    return routes.loggedIn;
  }

  if (user?.userId && user?.chef?.isChef) {
    return routes.chefLoggedIn;
  }

  return routes.loggedOut;
};

interface AppBarProps {
  user: User | undefined;
}
export default function AppBar(props: AppBarProps) {
  const routes = fetchListItems(props.user);
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Open user popover menu"
            height={256}
            width={256}
            loader={localImageLoader}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {routes.map((route, i) => (
            <Menu.Item key={`${route.name}-${i}`}>
              {({ active }) => (
                <Link
                  href={route.route}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    `block px-4 py-2 text-md text-gray-700 ${
                      route.name === "Sign up" ? "font-bold" : null
                    }`,
                  )}
                >
                  {route.name}
                </Link>
              )}
            </Menu.Item>
          ))}
          {props.user && (
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex items-center px-4 py-2",
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <Button
                    onClick={async () => await logoutMutation()}
                    className="block text-md text-red-600 pl-2 hover:text-red-600"
                    variant="ghost"
                  >
                    Sign out
                  </Button>
                </div>
              )}
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
