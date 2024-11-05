import useFetchOfferings from "../hooks/useFetchOfferings";
import "../App.css"

function ViewAdminOffering() {
    const { offerings, error } = useFetchOfferings();

    return (
        <div>
            <h1>All Offerings</h1>

            {offerings.map((offering => (
                <div key={offering._id} className="viewOfferings">
                    <h3>{offering.lesson.type} Lesson</h3>
                    <p> <b>Location</b>: {offering.location.name} {offering.location.space.type}, {offering.location.city} <br></br>
                       <b>Day</b>: {offering.location.schedule.day}s from {offering.location.schedule.startDate} until {offering.location.schedule.endDate}<br></br>
                       <b>Time</b>: {offering.location.schedule.startTime} - {offering.location.schedule.endTime} <br></br>
                       <b>{offering.lesson.private ? "Private lesson" : "Group lesson"}</b>
                    </p>
                    </div>
            )))}
        </div>
    );
}
export default ViewAdminOffering;