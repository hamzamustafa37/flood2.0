import React from "react";
import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";

import AffectedModalFooter from "../../common/AffectedModalFooter";
import AffectedModalHeader from "../../common/AffectedModalHeader";
import { addAffectedAreas, JobData } from "@/lib/features/job";

interface IDamageAreaSelection {
  moveNext: (move: number) => void;
}

const damageTypes = ["Flooring", "Ceiling", "Walling"];

const DamageAreaSelection = ({ moveNext }: IDamageAreaSelection) => {
  const dispatch = useDispatch();
  const specifyArea = useSelector(JobData);

  const onChange = (
    site: string,
    room: string,
    damageType: string,
    checked: boolean,
    images: File[]
  ) => {
    dispatch(
      addAffectedAreas({
        siteType: site,
        roomType: room,
        damagePart: damageType,
        images: [],
        materials: [],
      })
    );
  };

  const siteRoomMap = specifyArea.affectedAreas
    .filter((curr: any) => curr.siteType && curr.roomType)
    .reduce((acc: Record<string, Array<string>>, curr) => {
      if (!acc[curr.siteType]) {
        acc[curr.siteType] = [];
      }
      if (!acc[curr.siteType].includes(curr.roomType)) {
        acc[curr.siteType].push(curr.roomType);
      }
      return acc;
    }, {});

  return (
    <div className="pt-3">
      <AffectedModalHeader
        headline={"Evaluate Damage in Each Selected Room"}
        stripline={"Assess the damage in the selected rooms below"}
      />

      <div className="mt-6">
        {Object.keys(siteRoomMap).map((site) => (
          <div key={site} className="mb-6">
            <h2 className="text-xl font-semibold text-black mb-3">{site}</h2>
            {siteRoomMap[site].map((room: string) => (
              <div key={room} className="mt-4 border-b border-[#CBD0DD] pb-2">
                <h6 className="text-blue-600 font-medium">{room}</h6>
                <div className="flex flex-col gap-2 mt-2">
                  {damageTypes.map((damageType) => (
                    <Checkbox
                      key={damageType}
                      checked={specifyArea.affectedAreas.some(
                        (area: any) =>
                          area.siteType === site &&
                          area.roomType === room &&
                          area.damagePart === damageType
                      )}
                      onChange={(e) =>
                        onChange(site, room, damageType, e.target.checked, [])
                      }
                    >
                      {damageType}
                    </Checkbox>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        <AffectedModalFooter
          previousPageNo={1}
          nextPageNo={3}
          specifyArea={specifyArea}
          moveNext={moveNext}
        />
      </div>
    </div>
  );
};

export default DamageAreaSelection;
