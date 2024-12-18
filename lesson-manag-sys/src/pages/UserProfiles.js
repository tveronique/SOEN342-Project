import useFetchUsers from "../hooks/useFetchUsers";
import "../App.css";

export default function UserProfiles() {
    const { users, error } = useFetchUsers();

    return (
        <div>
            <h1>User Profiles</h1>

            {users.map((user) => {
                const displayedRole = user.role === "CLIENT" && user.childName ? "guardian" : user.role;

                return (
                    user.role !== "ADMIN" && (
                        <div key={user.id} className="viewOfferings">
                            {/* Display name and role */}
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
                            </p>
                        </div>
                    )
                );
            })}
        </div>
    );
}