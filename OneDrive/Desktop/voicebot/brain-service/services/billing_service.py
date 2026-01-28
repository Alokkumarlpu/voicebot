class BillingService:
    """Service for billing-related queries"""
    
    def __init__(self):
        self.invoices = self._init_invoices()
    
    def _init_invoices(self):
        """Initialize invoice data"""
        return [
            {
                "id": "inv_001",
                "date": "2024-01-15",
                "amount": 500,
                "status": "paid",
                "description": "Monthly subscription - Basic Plan"
            },
            {
                "id": "inv_002",
                "date": "2024-01-10",
                "amount": 150,
                "status": "pending",
                "description": "Extra battery swap charges"
            }
        ]
    
    def get_invoice(self, invoice_id: str) -> dict:
        """Get invoice details"""
        for invoice in self.invoices:
            if invoice["id"] == invoice_id:
                return invoice
        return None
    
    def get_pending_invoices(self) -> list:
        """Get pending invoices"""
        return [inv for inv in self.invoices if inv["status"] == "pending"]
    
    def get_total_pending(self) -> float:
        """Get total pending amount"""
        return sum(inv["amount"] for inv in self.get_pending_invoices())
