export const fetchUsers = ({ pageParam = 1 }: { pageParam?: number }) => {
    return fetch(`https://randomuser.me/api/?results=10&seed=brian&page=${pageParam}`)
      .then(res => {
        return res.json()
      })
      .then(json => {
        const nextCursor = Number(json.info.page)
        return {
          users: json.results,
          nextCursor
        }
      })
  }