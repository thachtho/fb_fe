import type { TableColumnsType } from 'antd';
import { Button, Table } from 'antd';
import React from 'react';
import useGetDataMembers from './hooks';
import useAcceptMember, { IMember } from './state';
import { accepMember, deleteMember } from 'api/user.api';

const AcceptMember: React.FC = () => {
  const { members, setMembers } = useAcceptMember()
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
      dataIndex: 'phone',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'access',
      render: (status: boolean) => {
        return <>
          { status ? 1 : 0 }
        </>
      },
    },
    {
      title: 'Action',
      render: (_, record) => {
        return <div className='flex'>
          <Button type="primary" onClick={() => accept(record.phone)}>Duyệt</Button>
          <div className='ml-2'></div>
          <Button type="primary" onClick={() => remove(record.id)}>Xóa</Button>
        </div>
      },
    },
  ];
  return (
    <>
      {newMembers && newMembers?.length > 0 &&
        <div className='mt-20 bg-white'>
          <Table
            columns={columns}
            dataSource={newMembers}
            pagination={{ pageSize: 10 }} 
          />
        </div>
      }    
    </>
  );
};

export default AcceptMember;

