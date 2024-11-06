import useFetchUsers from "../hooks/useFetchUsers";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import "../App.css"
    
function DeleteUsers() {
    const { users, error, setUsers } = useFetchUsers();

    const handleDelete = async (phoneNumber) => {
        console.log(phoneNumber);
        try {
            await axios.delete(`/api/users/delete/${phoneNumber}`);
            alert("User deleted successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please try again.");
        }
    };

    return (
        <div>
            <h1>User Profiles</h1>

            {users.map((user) => {
                const displayedRole = user.role === "CLIENT" && user.childName ? "guardian" : user.role;

                return (
                    user.role !== "ADMIN" && (
                        <div key={user.id} className="viewOfferings">
                            <h3>{user.name} - {displayedRole.charAt(0).toUpperCase() + displayedRole.slice(1).toLowerCase()}</h3>
                            <p> 
                                <b>Phone Number</b>: {user.phoneNumber} <br />
                                
                                {user.role === "INSTRUCTOR" && (
                                    <>
                                        <b>Available Cities</b>: {user.availableCities ? user.availableCities.join(", ") : 'N/A'} <br />
                                        <b>Specialization</b>: {user.specialization ? user.specialization.join(", ") : 'N/A'}
                                    </>
                                )}
                                
                                {displayedRole === "guardian" && (
                                    <>
                                        <b>Child Name</b>: {user.childName} <br />
                                        <b>Child Age</b>: {user.childAge} <br />
                                        <b>Relationship to the Child</b>: {user.relationship}
                                    </>
                                )}
                                <br></br>
                                <Button variant="outline-danger" style={{display: 'flex', margin:'0 auto', width:'50%', justifyContent:'center'}} onClick={() => handleDelete(user.phoneNumber)}>Delete</Button>
                            </p>
                        </div>
                    )
                );
            })}
        </div>
    );
}
export default DeleteUsers;