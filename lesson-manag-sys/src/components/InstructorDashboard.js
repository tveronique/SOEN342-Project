import useFetchOfferings from "../hooks/useFetchOfferings";
import "../App.css"
import useFetchUserByPhone from "../hooks/useFetchUserByPhone";

function instructorDashboard() {
    const { offerings, error } = useFetchOfferings();
    const {phoneNumber} = localStorage.getItem("phoneNumber");
    const {user, errors} = useFetchUserByPhone();
    const {availableCities} = user.availableCities;
    const {specialization} = user.specialization;

    if (error) {
        return <div>Error loading offerings: {error.message}</div>;
    }

    const filteredOfferings = offerings.filter(offering => {
        // Check if offering's city matches any of the instructor's available cities
        const cityMatch = availableCities.includes(offering.location.city);

        // Check if offering's lesson type matches any of the instructor's specializations
        const specializationMatch = specialization.includes(offering.lesson.type);

        // Return true only if both conditions are met
        return cityMatch && specializationMatch;
    });

    return (
        <div>
            <h1>Available Offerings for You</h1>

            {filteredOfferings.length > 0 ? (
                filteredOfferings.map((offering) => (
                    <div key={offering._id} className="viewOfferings">
                        <h3>{offering.lesson.type} Lesson</h3>
                        <p>
                            <b>Location</b>: {offering.location.name} {offering.location.space.type}, {offering.location.city} <br />
                            <b>Day</b>: {offering.location.schedule.day}s from {offering.location.schedule.startDate} until {offering.location.schedule.endDate} <br />
                            <b>Time</b>: {offering.location.schedule.startTime} - {offering.location.schedule.endTime} <br />
                            <b>{offering.lesson.private ? "Private lesson" : "Group lesson"}</b>
                        </p>
                    </div>
                ))
            ) : (
                <p>No offerings match your location and specialization criteria.</p>
            )}
        </div>
    );
}

export default instructorDashboard;
