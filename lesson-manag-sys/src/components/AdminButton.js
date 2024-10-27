import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';

function AdminButton() {
    const navigate = useNavigate();  // Hook to navigate between pages

    const handleUserProfiles = () => {
        navigate('/user-profiles');  // Navigate to the user profiles page
    };

    const handleOfferings = () => {
        navigate('/offerings');  // Navigate to the offerings page
    };

  return (
    <ButtonGroup>
      <Button variant="secondary" onClick={handleUserProfiles}>Modify User Profiles</Button>

      <Button variant="secondary" onClick={handleOfferings}>Modify Offerings</Button>
    </ButtonGroup>
  );
}

export default AdminButton;