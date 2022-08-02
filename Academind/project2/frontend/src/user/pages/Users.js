import React from 'react'
import UsersList from '../components/UsersList'

export default function Users() {
    const USERS =[
        {
            id: 'u1',
            name:'hari',
            image: 'https://picsum.photos/100/100',
            places: 3
        }
    ]
  return (
    <UsersList items= {USERS}/>
  )
}
