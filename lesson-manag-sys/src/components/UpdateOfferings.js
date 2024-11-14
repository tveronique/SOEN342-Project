import { useState } from "react";
import useFetchOfferings from "../hooks/useFetchOfferings";
import Button from 'react-bootstrap/Button';
import "../App.css";
import UpdateOfferingForm from './UpdateOfferingsForm';

function UpdateOfferings() {
    const { offerings, error } = useFetchOfferings();
    const [editingOffering, setEditingOffering] = useState(null);

    const handleEdit = (offering) => {
        setEditingOffering(offering);
        // To scroll down automatically to the UpdateOfferingForm
        setTimeout(() => {
            const formElement = document.getElementById('update-form');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleUpdate = (updatedOffering) => {
        setEditingOffering(null);
    };

    return (
        <div>
            <h1>Update Offerings</h1>

            {offerings.map((offering) => (
                <div key={offering._id} className="viewOfferings">
                    <h3>{offering.lesson.type} Lesson</h3>
                    <p>
                        <b>Location</b>: {offering.location.name} {offering.location.space.type}, {offering.location.city} <br />
                        <b>Day</b>: {offering.location.schedule.day}s from {offering.location.schedule.startDate} until {offering.location.schedule.endDate}<br />
                        <b>Time</b>: {offering.location.schedule.startTime} - {offering.location.schedule.endTime} <br />
                        <b>{offering.lesson.private ? "Private lesson" : "Group lesson"}</b> <br /><br />
                        <Button
                            variant="outline-primary"
                            style={{ display: 'flex', margin: '0 auto', width: '50%', justifyContent: 'center' }}
                            onClick={() => handleEdit(offering)}
                        >
                            Edit
                        </Button>
                    </p>
                </div>
            ))}

            {editingOffering && (
                <div id="update-form">
                    <UpdateOfferingForm
                        offering={editingOffering}
                        onClose={() => setEditingOffering(null)}
                        onUpdate={handleUpdate}
                    />
                </div>
            )}
        </div>
    );
}

export default UpdateOfferings;
