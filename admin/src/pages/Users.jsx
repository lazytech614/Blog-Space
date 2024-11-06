import React,{useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import UserTableItem from '../components/userTableItem'
import { WarningModal } from '../modal/WarningModal'
import useGetAllUsers from '../hooks/useGetAllUsers'
import useDeleteUser from '../hooks/useDeleteUser'

const Users = () => {
    const [isOpenWarningModal, setIsOpenWarningModal] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    

    const {getAllUsers, users, setUsers, isLoading: isGetAllUsersLoading} = useGetAllUsers()
    const {deleteUser, isLoading: isDeleteLoading} = useDeleteUser()

    useEffect(() => {
      window.scrollTo(0, 0)
      getAllUsers()
    }, [])

    const handleDelete = async (id) => {
      setSelectedUserId(id)
      setIsOpenWarningModal(true)
    }

    const confirmDelete = async () => {
      deleteUser(selectedUserId, setSelectedUserId, users, setUsers)
    }

  return (
    <div className='flex flex-col sm:flex-row'>
      <Sidebar />
      <div className='w-full'>
        <Navbar />
        <div className='px-6 lg:px-10 pt-4 text-[12px] lg:text-[16px]'>
          <div className='grid grid-cols-[0.1fr,1fr,1fr,2fr,1fr,1fr] gap-2 mb-8'>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Id</div>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Name</div>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Username</div>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>E-mail</div>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Subscription status</div>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Action</div>
          </div>
          <div className='grid grid-cols-[0.1fr,1fr,1fr,2fr,1fr,1fr] gap-2 overflow-y-auto max-h-[80vh] scrollbar-hidden'>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <UserTableItem {...user}  onDelete={() => handleDelete(user.id)}/>
                <div className='col-span-6 h-[2px] bg-black'></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <WarningModal
        warning="Are you sure you want to delete this user?"
        isOpenWarningModal={isOpenWarningModal}
        setIsOpenWarningModal={setIsOpenWarningModal}
        onConfirmDelete={confirmDelete}
      />
    </div>
  )
}

export default Users