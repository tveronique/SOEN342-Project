import OfferingCrudModal from '../components/OfferingCrudModal'
import UserCrudModal from '../components/UserCrudModal'

export default function AdminDashboard(){
    return(
        <>
            <h2>Administrator Dashboard</h2>
            <br></br>
            <h3>Select your option</h3>
            <div className='mb-4 mt-4'>
            <OfferingCrudModal />
            </div>
            <div>
            <UserCrudModal />
            </div>
        </>
    )
}