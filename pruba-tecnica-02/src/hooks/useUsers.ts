import { fetchUsers } from "../services/users"
import { type User } from "../types"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useUsers =()=>{ 
const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
useInfiniteQuery<{ nextCursor: number, users: User[] }>({
  queryKey: ['users'],
  queryFn: fetchUsers,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  staleTime:1000
})
return {
    isLoading,
    isError,
    users: data?.pages.flatMap(pages=>pages.users)??[],
    refetch,
    fetchNextPage,
    hasNextPage
}
}