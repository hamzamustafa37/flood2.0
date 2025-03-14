import { Checkbox } from "antd";
import React from "react";
import { Button } from "../../common";
import { IAffectedArea, type IJob } from "@/utils";
import { useAppDispatch } from "@/lib/hooks";
import { addAffectedAreas } from "@/lib/features/job";

interface IDamageAreaSelection {
  selectedRooms: string[];
  selectedFloor: string;
  specifyArea: IJob;
  moveNext: (move: number) => void;
  setSelectedArea: (specifyArea: any) => void;
}

const damageTypes = ["Flooring", "Ceiling", "Walling"];

const DamageAreaSelection = ({
  selectedRooms,
  selectedFloor,
  setSelectedArea,
  specifyArea,
  moveNext,
}: IDamageAreaSelection) => {
  const dispatch = useAppDispatch();
  const onChange = (room: string, damageType: string, checked: boolean) => {
    setSelectedArea((prev: any) => {
      let updatedAreas: Array<IAffectedArea> = [...prev.affectedAreas];

      if (checked) {
        const existingIndex = updatedAreas.findIndex(
          (area) => area.damagePart === damageType && area.roomType === room
        );

        if (existingIndex === -1) {
          updatedAreas.push({
            roomType: room,
            damagePart: damageType,
            materials: [],
          });
        }
      } else {
        updatedAreas = updatedAreas.filter(
          (area) => !(area.damagePart === damageType && area.roomType === room)
        );
      }

      dispatch(
        addAffectedAreas({
          roomType: room,
          damagePart: damageType,
          materials: [],
        })
      );

      return {
        ...prev,
        affectedAreas: updatedAreas,
      };
    });
  };

  return (
    <div className="mt-6">
      <h1 className="text-xl font-semibold">{selectedFloor}</h1>
      <p className="text-gray-600">
        Check what's affected in the selected rooms:
      </p>

      {selectedRooms.map((room) => (
        <div key={room} className="mt-4 border-b border-[#CBD0DD] pb-2">
          <h6 className="text-blue-600 font-medium">{room}</h6>
          <div className="flex flex-col gap-2 mt-2">
            {damageTypes.map((damageType) => (
              <Checkbox
                key={damageType}
                checked={specifyArea.affectedAreas?.some(
                  (area) =>
                    area.roomType === room && area.damagePart === damageType
                )}
                onChange={(e) => onChange(room, damageType, e.target.checked)}
              >
                {damageType}
              </Checkbox>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-500">Previous</p>
        </div>
        <Button
          onClick={() => moveNext(2)}
          className={`bg-blue-500 rounded-lg px-4 py-2 text-white ${
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
  );
};

export default DamageAreaSelection;
