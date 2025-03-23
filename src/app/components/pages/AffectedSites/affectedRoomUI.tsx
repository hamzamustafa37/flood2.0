"use client";
import React, { useState } from "react";
import { Button } from "../../common";
import SiteOption from "./siteOption";
import Rooms from "./roomsUI";
import DamageAreaSelection from "./damageArea";
import { IAffectedArea, IJob } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addRooms, JobData } from "@/lib/features/job";
import SpecifyDamage from "./specifyDamage";
import RoomImageUploader from "./roomImageUploader";
import EquipmentDetails from "./equimentDetails";
import SelectSite from "./selectSite";

export default function AffectedRooms() {
  const dispatch = useAppDispatch();
  const [selectedFloor, setSelectedFloor] = useState("Basement");
  const [specifyArea, setSelectedArea] = useState<IJob>({
    site: [],
    floor: [],
    roomType: [],
    affectedAreas: [],
  });
  const [step, setStep] = useState(0);
  const _jobs = useAppSelector(JobData);

  const selectedRooms = specifyArea.affectedAreas
    .filter((area) => area.roomType)
    .map((area) => area.roomType);

  const toggleRoomSelection = (site: string, room: string) => {
    setSelectedArea((prev) => {
      const exists = prev.affectedAreas.some(
        (area) => area.siteType === site && area.roomType === room
      );

      let updatedAreas: Array<IAffectedArea>;
      if (exists) {
        updatedAreas = prev.affectedAreas.filter(
          (area) => !(area.siteType === site && area.roomType === room)
        );
      } else {
        updatedAreas = [
          ...prev.affectedAreas,
          {
            siteType: site,
            roomType: room,
            damagePart: "",
            materials: [],
            images: [],
          },
        ];
        dispatch(addRooms({ siteType: site, room }));
      }

      return {
        ...prev,
        affectedAreas: updatedAreas,
      };
    });
  };

  const moveNext = (nextStep: number) => {
    console.log(nextStep);
    setStep(nextStep);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-gray-100">
      <div className="lg:col-span-3 col-span-12 rounded-lg bg-white p-4 shadow h-auto md:h-fit">
        <SiteOption
          setSelectedFloor={setSelectedFloor}
          selectedFloor={selectedFloor}
        />
      </div>

      <div className="lg:col-span-9 col-span-12 flex justify-center">
        <div className="lg:w-[50%] w-full rounded-lg bg-white p-6 shadow-lg ">
          <div className="h-auto overflow-y-auto">
            {step === 0 && (
              <SelectSite
                specifyArea={specifyArea}
                setSelectedArea={setSelectedArea}
                moveNext={() => moveNext(1)}
              />
            )}

            {step === 1 && (
              <Rooms
                toggleRoomSelection={toggleRoomSelection}
                step={step}
                specifyArea={specifyArea}
                moveNext={moveNext}
              />
            )}

            {step === 2 && <DamageAreaSelection moveNext={moveNext} />}

            {step === 3 && (
              <SpecifyDamage
                moveNext={moveNext}
                selectedFloor={selectedFloor}
                setSelectedArea={setSelectedArea}
                selectedRooms={selectedRooms}
              />
            )}
            {step === 4 && <RoomImageUploader moveNext={moveNext} />}

            {step === 5 && (
              <EquipmentDetails
                specifyArea={specifyArea}
                moveNext={() => moveNext(6)}
                selectedFloor={selectedFloor}
                setSelectedArea={setSelectedArea}
                selectedRooms={selectedRooms}
              />
            )}
          </div>

          <div className="mt-6 w-full flex justify-end p-4">
            <Button
              className={`mt-2 rounded-lg px-4 py-2 ${
                step < 5 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              disabled={step >= 5}
              onClick={() => moveNext(step + 1)}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
