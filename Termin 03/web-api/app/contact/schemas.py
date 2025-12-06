from pydantic import BaseModel,Field,EmailStr

class ContactMessage(BaseModel):
    """Sta nam frontend salje"""
    name : str = Field(...,min_length = 3)
    email : EmailStr
    message : str = Field(...,min_length= 3)
class ContactResponse(BaseModel):
    """Sta backend vraca"""
    success: bool
    message: str
