"use client";
import React, { useState } from "react";
import { Button } from "../../common";
import SiteOption from "./siteOption";
import Rooms from "./roomsUI";
import DamageAreaSelection from "./damageArea";
import { IAffectedArea, IJob } from "@/utils";
import { useAppDispatch } from "@/lib/hooks";
import { addRooms, addAffectedAreas } from "@/lib/features/job";
import SpecifyDamage from "./specifyDamage";
import RoomImageUploader from "./roomImageUploader";

export default function AffectedRooms() {
  const dispatch = useAppDispatch();
  const [selectedFloor, setSelectedFloor] = useState("Basement");
  const [selectedRooms, setSelectedRooms] = useState<Array<string>>([]);
  const [specifyArea, setSelectedArea] = useState<IJob>({
    floor: [],
    roomType: [],
    affectedAreas: [],
  });
  const [step, setStep] = useState(0);

  const toggleRoomSelection = (room: string) => {
    setSelectedRooms((prev) => {
      const updatedRooms = prev.includes(room)
        ? prev.filter((r) => r !== room)
        : [...prev, room];

      setSelectedArea((prev) => ({
        ...prev,
        roomType: updatedRooms,
      }));

      dispatch(addRooms(updatedRooms));

      return updatedRooms;
    });
  };

  const moveNext = (move: number) => {
    setStep((prev) => (move < prev && move !== 0 ? prev - 1 : prev + 1));
  };
  console.log(specifyArea, "The area");
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-gray-100">
      <div className="md:col-span-3 col-span-12 rounded-lg bg-white p-4 shadow h-auto md:h-fit">
        <SiteOption
          setSelectedFloor={setSelectedFloor}
          selectedFloor={selectedFloor}
        />
      </div>

      <div className="md:col-span-9 col-span-12 flex justify-center">
        <div className="md:w-[50%] w-full rounded-lg bg-white p-6 shadow-lg ">
          <div className="h-[600px] overflow-y-auto">
            {step === 0 && (
              <Rooms
                selectedFloor={selectedFloor}
                selectedRooms={selectedRooms}
                toggleRoomSelection={toggleRoomSelection}
                step={step}
                moveNext={moveNext}
              />
            )}
            {step === 1 && (
              <DamageAreaSelection
                selectedRooms={selectedRooms}
                selectedFloor={selectedFloor}
                specifyArea={specifyArea}
                setSelectedArea={setSelectedArea}
                moveNext={moveNext}
              />
            )}
            {step === 2 && (
              <SpecifyDamage
                specifyArea={specifyArea}
                moveNext={moveNext}
                selectedRooms={selectedRooms}
                selectedFloor={selectedFloor}
                setSelectedArea={setSelectedArea}
              />
            )}
            {step === 3 && (
              <RoomImageUploader
                specifyArea={specifyArea}
                moveNext={moveNext}
                selectedRooms={selectedRooms}
                selectedFloor={selectedFloor}
                setSelectedArea={setSelectedArea}
              />
            )}
          </div>
          {selectedFloor === "Basement" && (
            <div className="mt-6 w-full rounded-lg border border-[#CBD0DD] p-4 text-gray-400">
              <p>Main Floor</p>
            </div>
          )}
          <div className="mt-6 w-full flex justify-end p-4 text-gray-400">
            <Button className="mt-2 rounded-lg bg-gray-300 px-4 py-2" disabled>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
