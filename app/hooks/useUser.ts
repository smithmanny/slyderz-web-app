import { trpc } from "server/utils/trpc";

function useUser() {
  const { data } = trpc.user.fetchUserData.useQuery(undefined, {
    cacheTime: Infinity,
    staleTime: Infinity
  })

  return data
}

export default useUser;
