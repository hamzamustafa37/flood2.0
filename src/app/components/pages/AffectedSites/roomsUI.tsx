import React from "react";
import { IJob, rooms, IAffectedArea } from "@/utils";
import AffectedModalHeader from "../../common/AffectedModalHeader";
import AffectedModalFooter from "../../common/AffectedModalFooter";
import { JobData } from "@/lib/features/job";
import { useSelector } from "react-redux";

interface ISelectedRooms {
  toggleRoomSelection: (site: string, room: string) => void;
  step: number;
  specifyArea: IJob;
  moveNext: (move: number) => void;
}

const Rooms = ({
  specifyArea,
  toggleRoomSelection,
  step,
  moveNext,
}: ISelectedRooms) => {
  const _jobs = useSelector(JobData);

  const isRoomSelected = (site: string, room: string) => {
    return specifyArea.affectedAreas.some(
      (area) => area.siteType === site && area.roomType === room
    );
  };

  return (
    <div className="pt-3">
      <AffectedModalHeader
        headline={"Select Affected Rooms on the Floor"}
        stripline={"Which rooms on this floor are affected?"}
      />
      <div className="rounded-lg bg-white p-6 mt-2 shadow-lg border border-[#E3E6ED]">
        {_jobs?.site.map((site) => (
          <div className="mt-6" key={site}>
            <h3 className="text-lg font-semibold">{site}</h3>
            <p className="text-gray-600">
              What rooms are affected in the {site.toLowerCase()}?
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {rooms.map((room) => (
                <button
                  key={`${site}-${room}`}
                  className={`cursor-pointer border border-blue-200 bg-blue-100 rounded-full px-3 py-1 text-sm transition ${
                    isRoomSelected(site, room)
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-gray-200 border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                  }`}
                  onClick={() => toggleRoomSelection(site, room)}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>
        ))}

        <AffectedModalFooter
          previousPageNo={0}
          nextPageNo={2}
          specifyArea={specifyArea}
          moveNext={moveNext}
        />
      </div>
    </div>
  );
};

export default Rooms;
