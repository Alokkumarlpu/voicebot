class StationService:
    """Service for battery station queries"""
    
    def __init__(self):
        self.stations = self._init_stations()
    
    def _init_stations(self):
        """Initialize station data"""
        return [
            {
                "id": "station_001",
                "name": "Delhi Smart Station",
                "location": {"lat": 28.7041, "lng": 77.1025},
                "batteries": 15,
                "status": "operational",
                "hours": "6:00 AM - 11:00 PM"
            },
            {
                "id": "station_002",
                "name": "Bangalore Hub",
                "location": {"lat": 12.9716, "lng": 77.5946},
                "batteries": 8,
                "status": "operational",
                "hours": "6:00 AM - 11:00 PM"
            },
            {
                "id": "station_003",
                "name": "Mumbai Center",
                "location": {"lat": 19.0760, "lng": 72.8777},
                "batteries": 12,
                "status": "operational",
                "hours": "5:00 AM - 12:00 AM"
            }
        ]
    
    def get_nearest_station(self, lat: float, lng: float, limit: int = 3) -> list:
        """Get nearest stations"""
        # Simplified - in production would use distance calculation
        return self.stations[:limit]
    
    def get_station(self, station_id: str) -> dict:
        """Get station details"""
        for station in self.stations:
            if station["id"] == station_id:
                return station
        return None
    
    def get_available_batteries(self, station_id: str) -> int:
        """Get available batteries at station"""
        station = self.get_station(station_id)
        return station["batteries"] if station else 0
