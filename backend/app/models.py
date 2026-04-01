from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from enum import Enum


class TicketStatus(str, Enum):
    in_progress = "in progress"
    todo = "todo"
    closed = "closed"


class TicketCreate(BaseModel):
    title: str
    description: str


class TicketUpdate(BaseModel):
    title: str
    description: str
    status: TicketStatus


class Ticket(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    title: str
    description: str
    status: TicketStatus = TicketStatus.todo
