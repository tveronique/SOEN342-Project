import useFetchOfferings from "../hooks/useFetchOfferings";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import "../App.css"
    
function DeleteOffering() {
    const { offerings, error, setOfferings } = useFetchOfferings();

    const handleDelete = async (offeringId) => {
        console.log(offeringId);
        try {
            await axios.delete(`/api/offerings/delete/${offeringId}`);
            alert("Offering deleted successfully!");
            await axios.delete(`/api/bookings/delete/${offeringId}`);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting offering:", error);
            //alert("Failed to delete offering. Please try again.");
        }
    };

    return (
        <div>
            <h1>Delete Offerings</h1>

            {offerings.map((offering => (
                <div key={offering._id} className="viewOfferings">
                    <h3>{offering.lesson.type} Lesson</h3>
                    <p> <b>Location</b>: {offering.location.name} {offering.location.space.type}, {offering.location.city} <br></br>
                       <b>Day</b>: {offering.location.schedule.day}s from {offering.location.schedule.startDate} until {offering.location.schedule.endDate}<br></br>
                       <b>Time</b>: {offering.location.schedule.startTime} - {offering.location.schedule.endTime} <br></br>
                       <b>{offering.lesson.private ? "Private lesson" : "Group lesson"}</b> <br></br><br></br>
                       <Button variant="outline-danger" style={{display: 'flex', margin:'0 auto', width:'50%', justifyContent:'center'}} onClick={() => handleDelete(offering.id)}>Delete</Button>
                    </p>
                    </div>
            )))}
        </div>
    );
}
export default DeleteOffering;
