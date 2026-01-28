class LeaveService:
    """Service for leave-related queries"""
    
    def __init__(self):
        self.dsk_locations = self._init_dsk_locations()
    
    def _init_dsk_locations(self):
        """Initialize DSK (Driver Service Kiosk) locations"""
        return [
            {
                "id": "dsk_001",
                "name": "Delhi Main DSK",
                "location": "New Delhi",
                "hours": "9:00 AM - 6:00 PM",
                "phone": "+91-11-XXXX-XXXX"
            },
            {
                "id": "dsk_002",
                "name": "Bangalore South DSK",
                "location": "Bangalore",
                "hours": "9:00 AM - 6:00 PM",
                "phone": "+91-80-XXXX-XXXX"
            }
        ]
    
    def get_nearest_dsk(self, city: str) -> dict:
        """Get nearest DSK in city"""
        for dsk in self.dsk_locations:
            if city.lower() in dsk["location"].lower():
                return dsk
        return self.dsk_locations[0]
    
    def apply_leave(self, driver_id: str, dates: list) -> dict:
        """Apply for leave"""
        return {
            "status": "pending",
            "message": "Please visit your nearest DSK to complete the leave application",
            "dsk": self.get_nearest_dsk("Delhi")
        }
