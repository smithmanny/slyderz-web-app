// import Container from "app/components/Container";

// export default function DashboardMenuPage() {
//   return (
//     <Container>
//       <h1>Menu Slot Page</h1>
//     </Container>
//   );
// }

import UserPopover from "app/components/UserPopover";

import { getSession } from "app/lib/auth";

export default function DashboardPage() {
  return (
    <section className="col-span-1 md:col-span-5 py-3 bg-red-400">
      <div className="flex justify-end pr-4">
        {/* <UserPopover user={session?.user} /> */}
        <h1>Do you wek</h1>
      </div>
    </section>
  );
}
