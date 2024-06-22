import { getUsers } from 'api/user.api'
import React, { useEffect } from 'react'
import useAcceptMember from '../state'

function useGetDataMembers() {
    const { setMembers } = useAcceptMember()
    useEffect(() => {
        ( async () => {
            try {
                const { data: members } = await getUsers()
                setMembers(members)
            } catch (error) {
                console.log('Error:::', error)
            }
        }) ()
    }, [])
}

export default useGetDataMembers
