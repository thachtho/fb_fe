import Search, { SearchProps } from 'antd/es/input/Search'
import React, { useEffect, useState } from 'react'
import useAcceptMember, { IMember } from '../state'


function SearchMember() {
    const { members, setMembers } = useAcceptMember()
    const [memberCopy, setMemberCopy] = useState<IMember[]>([])
    const [isSetCopy, setIsSetCopy] = useState<boolean>(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length === 0) {
            return setMembers([...memberCopy])
        }

        const dataExits = (memberCopy as IMember[])?.filter((item) => item.phone.includes(value))
        dataExits && setMembers([...dataExits])
    }

    useEffect(() => {
        if (members && members.length > 0 && !isSetCopy) {
            const membersCopy = JSON.parse(JSON.stringify(members))
            setMemberCopy(membersCopy)
            setIsSetCopy(true)
        }

    }, [members])
    
    return (
        <div className='m-2'>
            <Search placeholder="input search text" onChange={(e) => onChange(e)}  enterButton />
        </div>
    )
}

export default SearchMember
