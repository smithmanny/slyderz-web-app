import { trpc } from "server/utils/trpc";

interface SessionType {
  userId: string
}

function useSession() {
  const session = trpc.auth.getSession.useQuery().data as SessionType
  return session
}

export default useSession