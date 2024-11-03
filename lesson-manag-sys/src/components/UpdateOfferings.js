import { useState } from "react";
import useFetchOfferings from "../hooks/useFetchOfferings";
import Button from 'react-bootstrap/Button';
import "../App.css"
import UpdateOfferingForm from './UpdateOfferingsForm';
    
function UpdateOfferings() {
    const { offerings, error } = useFetchOfferings();
    const [editingOffering, setEditingOffering] = useState(null); // Track offering for editing

    const handleEdit = (offering) => {
        setEditingOffering(offering); // Set the offering to be edited

    };

    const handleUpdate = (updatedOffering) => {
        // Update offerings list with new data
        setEditingOffering(null); // Close the form after updating
    };

    return (
        <div>
            <h1>Update Offerings</h1>

            {offerings.map((offering => (
                <div key={offering._id} className="viewOfferings">
                    <h3>{offering.lesson.type} Lesson</h3>
                    <p> <b>Location</b>: {offering.location.name} {offering.location.space.type}, {offering.location.city} <br></br>
                       <b>Day</b>: {offering.location.schedule.day}s from {offering.location.schedule.startDate} until {offering.location.schedule.endDate}<br></br>
                       <b>Time</b>: {offering.location.schedule.startTime} - {offering.location.schedule.endTime} <br></br>
                       <b>{offering.lesson.private ? "Private lesson" : "Group lesson"}</b> <br></br><br></br>
                       <Button variant="outline-primary" style={{display: 'flex', margin:'0 auto', width:'50%', justifyContent:'center'}} onClick={() => handleEdit(offering)}>Edit</Button>
                    </p>
                    </div>
            )))}

            {editingOffering && (
                <UpdateOfferingForm
                    offering={editingOffering}
                    onClose={() => setEditingOffering(null)} // Close the form on cancel
                    onUpdate={handleUpdate} // Handle the update
                />
            )}

        </div>
    );
}
export default UpdateOfferings;