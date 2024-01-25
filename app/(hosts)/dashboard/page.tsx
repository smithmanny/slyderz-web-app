import UserPopover from "app/components/UserPopover";

import { getSession } from "app/lib/auth";

export default async function DashboardPage() {
  const session = await getSession();
  return (
    <section className="col-span-1 md:col-span-5 py-3 bg-red-400">
      <div className="flex justify-end pr-4">
        <UserPopover user={session?.user} />
      </div>
    </section>
  );
}
