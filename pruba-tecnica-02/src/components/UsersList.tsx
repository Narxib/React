import { type User } from '../types.d'

interface Props {
  colorized:Boolean
  users: User[]
}

export function UsersList ({colorized,users }: Props) {
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
                    <tr style={{backgroundColor:color}} key={index}>
                            <td>
                                <img src={user.picture.thumbnail} alt="PF"/>
                            </td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td><button>Borrar</button></td>
                        </tr>
                  )
                })}
            </tbody>
        </table>
  )
}
