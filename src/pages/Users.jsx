import React from 'react'
import { useLoginContext } from '../context/UserContext'

function Users() {
    // const {users} = useLoginContext()
  return (
    <div>
      {users.map((user)=>{ 
            <p key = {user.id}>{user}</p>
      })}
    </div>
  )
}

export default Users
