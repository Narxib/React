import { type User } from '../types.d'

interface Props {
  deleteUser:(email:string)=>void
  colorized:Boolean
  users: User[]
}

export function UsersList ({deleteUser, colorized,users }: Props) {
  return (
        <table width="100%" >
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>País</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
                {users.map((user, index)=>{
                  const backgroundColor = index % 2 ===0 ? "#333" : "#555"
                  const color = colorized ? backgroundColor : "transparent"

                  return (
                    <tr style={{backgroundColor:color}} key={user.login.uuid}>
                            <td>
                                <img src={user.picture.thumbnail} alt="PF"/>
                            </td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td><button onClick={()=>{deleteUser(user.email)}}>Borrar</button></td>
                        </tr>
                  )
                })}
            </tbody>
        </table>
  )
}
