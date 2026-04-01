from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any
from uuid import UUID


class StorageAdapter(ABC):

    @abstractmethod
    def get_all(self) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    def get_by_id(self, item_id: UUID) -> Optional[Dict[str, Any]]:
        pass

    @abstractmethod
    def create(self, item: Dict[str, Any]) -> Dict[str, Any]:
        pass

    @abstractmethod
    def update(self, item_id: UUID, item: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        pass

    @abstractmethod
    def delete(self, item_id: UUID) -> None:
        pass
