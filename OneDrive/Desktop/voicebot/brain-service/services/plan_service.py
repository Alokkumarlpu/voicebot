class PlanService:
    """Service for plan-related queries"""
    
    def __init__(self):
        self.plans = self._init_plans()
    
    def _init_plans(self):
        """Initialize plan data"""
        return [
            {
                "id": "plan_001",
                "name": "Basic",
                "price": 500,
                "features": ["5 swaps/month", "Standard support"]
            },
            {
                "id": "plan_002",
                "name": "Premium",
                "price": 1000,
                "features": ["Unlimited swaps", "Priority support"]
            },
            {
                "id": "plan_003",
                "name": "Premium Plus",
                "price": 5000,
                "features": ["Unlimited swaps", "24/7 support", "Free accessories"]
            }
        ]
    
    def get_plan(self, plan_id: str) -> dict:
        """Get plan details"""
        for plan in self.plans:
            if plan["id"] == plan_id:
                return plan
        return None
    
    def get_all_plans(self) -> list:
        """Get all plans"""
        return self.plans
