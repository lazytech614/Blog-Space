import React,{useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'
import UserTableItem from '../components/userTableItem'
import { WarningModal } from '../modal/WarningModal'

const Users = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpenWarningModal, setIsOpenWarningModal] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
      window.scrollTo(0, 0)
      
      try{
        setIsLoading(true)

        const fetchUsers = async () => {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/users`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          }).then((res) => res.json())

          setUsers(response.users)
        }

        fetchUsers()
      }catch(err){
        console.log(err.message);
        toast.error(err.message);
      }finally{
        setIsLoading(false)
      }
    }, [])

    const handleDelete = async (id) => {
      setSelectedUserId(id)
      setIsOpenWarningModal(true)
    }

    const confirmDelete = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/delete-user/${selectedUserId}`, 
          {method: 'DELETE'}
        ).then((res) => res.json())

        if (response.success) {
          toast.success(response.message || 'User deleted successfully');
          setUsers(users.filter((user) => user.id !== selectedUserId));
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message); 
      }finally{
        setSelectedUserId(null)
        setIsLoading(false)
      }
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