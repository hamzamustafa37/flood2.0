import React from "react";
import { Button } from "../../common";
import { rooms } from "@/utils";

interface ISelectedRooms {
  selectedRooms: string[];
  selectedFloor: string;
  toggleRoomSelection: (room: string) => void;
  step: number;
  moveNext: (move: number) => void;
}
const Rooms = ({
  selectedRooms,
  selectedFloor,
  toggleRoomSelection,
  step,
  moveNext,
}: ISelectedRooms) => {
  return (
    <div>
      <h2 className="text-center text-2xl font-semibold">
        Select Affected Rooms on the Floor
      </h2>
      <p className="text-center text-gray-500">
        Which rooms on this floor are affected?
      </p>

      <div className="shadow-shadowLight rounded-lg p-4 mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-semibold">{selectedFloor}</h3>
          <p className="text-gray-600">
            What rooms are affected in the {selectedFloor.toLowerCase()}?
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {rooms.map((room) => (
              <button
                key={room}
                className={`cursor-pointer border border-blue-200 bg-blue-100 rounded-full px-3 py-1 text-sm transition ${
                  selectedRooms.includes(room)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => toggleRoomSelection(room)}
              >
                {room}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => moveNext(step)}
              className={`rounded-lg px-4 py-2 text-white ${
                selectedRooms.length > 0
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={selectedRooms.length === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
