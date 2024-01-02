import UserPopover from "app/components/UserPopover";
import Announcement from "app/components/Announcement";

export default function AppBar() {
  return (
    <nav className="fixed w-full bg-transparent z-50">
      <Announcement />
      <div className="mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8 z-50">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-1 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
          </div>
          {/* Right side of navbar */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <UserPopover />
          </div>
        </div>
      </div>
    </nav>
  );
}
