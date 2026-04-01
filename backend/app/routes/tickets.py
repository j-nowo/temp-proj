from uuid import UUID
from fastapi import APIRouter, HTTPException
from app.models import Ticket, TicketCreate, TicketUpdate
from app.storage import store

router = APIRouter()


@router.get("")
def get_tickets():
    return store.get_all()


@router.post("", status_code=201)
def create_ticket(body: TicketCreate):
    ticket = Ticket(**body.model_dump())
    return store.create(ticket.model_dump())


@router.put("/{ticket_id}")
def update_ticket(ticket_id: UUID, body: TicketUpdate):
    updated = store.update(ticket_id, {"id": ticket_id, **body.model_dump()})
    if not updated:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return updated


@router.delete("/{ticket_id}", status_code=204)
def delete_ticket(ticket_id: UUID):
    if not store.get_by_id(ticket_id):
        raise HTTPException(status_code=404, detail="Ticket not found")
    store.delete(ticket_id)
