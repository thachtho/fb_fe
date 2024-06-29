import type { TableColumnsType } from 'antd';
import { Button, Table } from 'antd';
import { accepMember, deleteMember } from 'api/user.api';
import React from 'react';
import SearchMember from './components/Search';
import useGetDataMembers from './hooks';
import useAcceptMember, { IMember } from './state';

const AcceptMember: React.FC = () => {
  const {  setMembers } = useAcceptMember()
  let members = [
    {
    "id": "1",
    "phone": "0963466269",
    "password": "111111",
    "access": true
    },
    {
    "id": "2527",
    "phone": "0766634729",
    "password": "111111",
    "access": true
    },
    {
    "id": "50d1",
    "phone": "0945260902",
    "password": "111111",
    "access": true
    },
  ]

  useGetDataMembers()
  const newMembers = members?.map((item) => {
    return {
      key: item.id,
      ...item
    }
  })

  const accept = async (phone: string) => {
    try {
      await accepMember(phone)
      const newData = members?.find((item) => item.phone === phone);
      
      if (newData) {
        newData.access = true;
        members && setMembers([...members])
      }
    } catch (error) {
      console.log('Error:::', error)
    }
  }

  const remove = async (id: string) => { 
    try {
      await deleteMember(id)
      const newDatas = members?.filter((item) => item.id !== id);
      newDatas && setMembers([...newDatas])
    } catch (error) {
      console.log('Error:::', error)
    }
  }

  const columns: TableColumnsType<IMember> = [
    {
      title: 'Phone',
      fixed: 'left',
      dataIndex: 'phone',
      render: (text: string) => <a>{text}</a>,
      responsive: ['sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Status',
      width: 50,
      dataIndex: 'access',
      render: (status: boolean) => {
        return <>
          { status ? 1 : 0 }
        </>
      },
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Mật khẩu',
      width: 100,
      dataIndex: 'password',
      render: (text: string) => <a>{text}</a>,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Action',
      fixed: 'right',
      render: (_, record) => {
        return <div className='flex'>
          <Button type="primary" onClick={() => accept(record.phone)}>Duyệt</Button>
          <div className='ml-2'></div>
          <Button type="primary" onClick={() => remove(record.id)}>Xóa</Button>
        </div>
      },
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  ];
  
  return (
    <>
      
        <div className='mt-20 bg-white'>
          <div className='flex justify-between'>
            <div></div>
            <SearchMember/>
          </div>
          {newMembers && newMembers?.length > 0 &&
            <Table
              columns={columns}
              dataSource={newMembers}
              pagination={{ pageSize: 10 }} 
            />
          }  
        </div>
       
    </>
  );
};

export default AcceptMember;

