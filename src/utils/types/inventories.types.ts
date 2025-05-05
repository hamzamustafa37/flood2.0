export interface IInventory {
  id: string;
  name: string;
  equipmentId: string;
  locationId: string;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
  location?: {
    _firestore?: {
      projectId: string;
    };
    _path?: {
      segments: Array<string>;
    };
    _converter?: object;
  };
}

export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}
