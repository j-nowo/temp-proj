from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4
from .storage_adapter import StorageAdapter


def _make(title: str, description: str, status: str) -> Dict[str, Any]:
    uid = uuid4()
    return {"id": uid, "title": title, "description": description, "status": status}


class LocalMemory(StorageAdapter):
    def __init__(self):
        seeds = [
            _make("Collect bananas", "Gather fresh bananas from the tall jungle trees. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "todo"),
            _make("Fix treehouse branch", "Repair the main branch supporting the ape treehouse.", "todo"),
            _make("Guard banana stash", "Protect the banana pile from sneaky monkeys.", "in progress"),
            _make("Practice vine swinging", "Train young apes to swing safely between vines.", "in progress"),
            _make("Build banana storage", "Create a dry area to store collected bananas.", "closed"),
            _make("Scout new banana trees", "Explore the north jungle for new banana spots.", "closed"),
            _make("Inspect ripe bananas", "Check banana pile and remove spoiled ones.", "closed"),
            _make("Organize jungle meeting", "Gather the ape tribe to discuss food supply.", "closed"),
            _make("Teach baby apes climbing", "Show young apes safe climbing techniques.", "closed"),
            _make("Jungle patrol", "Check nearby jungle paths for predators.", "closed"),
        ]
        self.storage: Dict[UUID, Dict[str, Any]] = {item["id"]: item for item in seeds}

    def get_all(self) -> List[Dict[str, Any]]:
        return list(self.storage.values())

    def get_by_id(self, item_id: UUID) -> Optional[Dict[str, Any]]:
        return self.storage.get(item_id)

    def create(self, item: Dict[str, Any]) -> Dict[str, Any]:
        self.storage[item["id"]] = item
        return item

    def update(self, item_id: UUID, item: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        if item_id not in self.storage:
            return None
        self.storage[item_id] = item
        return item

    def delete(self, item_id: UUID) -> None:
        self.storage.pop(item_id, None)
