import { IAffectedArea, IJob } from "@/utils";
import { Button, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import AffectedModalFooter from "../../common/AffectedModalFooter";
import AffectedModalHeader from "../../common/AffectedModalHeader";

interface IEquipmentItem {
  equipmentType: string;
  quantity: number;
  days: number;
  isRented: boolean;
}

interface IEquipmentDetails {
  selectedRooms: string[];
  selectedFloor: string;
  specifyArea: IJob;
  moveNext: (move: number) => void;
  setSelectedArea: (specifyArea: any) => void;
}

const EquipmentDetails = ({ specifyArea, moveNext }: IEquipmentDetails) => {
  const [site] = useState(["Basement"]);
  const [tabItems, setTabItems] = useState<any[]>([]);
  const [equipmentData, setEquipmentData] = useState<
    Record<string, Array<IEquipmentItem>>
  >({});

  const groupAffectedAreas = (affectedAreas: Array<IAffectedArea>) => {
    return affectedAreas.reduce<Record<string, Array<IAffectedArea>>>(
      (acc, area) => {
        if (!acc[area.roomType]) {
          acc[area.roomType] = [];
        }
        acc[area.roomType].push(area);
        return acc;
      },
      {}
    );
  };

  const handleChange = (
    room: string,
    index: number,
    field: keyof IEquipmentItem,
    value: any
  ) => {
    const updatedRoomData = [...(equipmentData[room] || [])];
    updatedRoomData[index] = {
      ...updatedRoomData[index],
      [field]: value,
    };
    setEquipmentData((prev) => ({ ...prev, [room]: updatedRoomData }));
  };

  const addEquipment = (room: string) => {
    setEquipmentData((prev) => ({
      ...prev,
      [room]: [
        ...(prev[room] || []),
        { equipmentType: "", quantity: 0, days: 0, isRented: false },
      ],
    }));
  };

  const handleSubmit = () => {
    console.log("Equipment Data: ", equipmentData);
    moveNext(6);
  };

  useEffect(() => {
    const groupedAreas = groupAffectedAreas(specifyArea.affectedAreas);
    const newTabItems = Object.entries(groupedAreas).map(([room]) => ({
      key: room,
      label: room,
      children: (
        <div>
          <p className="mb-4">
            Choose the necessary equipment based on the affected area and damage
            type.
          </p>

          {(equipmentData[room] || []).map((item, index) => (
            <div key={index} className=" rounded p-4 mb-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm mb-1 block">Equipment Type</label>
                  <select
                    value={item.equipmentType}
                    onChange={(e) =>
                      handleChange(room, index, "equipmentType", e.target.value)
                    }
                    className="border rounded w-full p-2"
                  >
                    <option value="">Select Equipment</option>
                    <option value="Dehumidifier">Dehumidifier</option>
                    <option value="Air Mover">Air Mover</option>
                    <option value="Heater">Heater</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm mb-1 block">Quantity</label>
                  <input
                    type="number"
                    min={0}
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(
                        room,
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    className="border rounded w-full p-2"
                  />
                </div>
                <div>
                  <label className="text-sm mb-1 block">No. of Days</label>
                  <input
                    type="number"
                    min={0}
                    value={item.days}
                    onChange={(e) =>
                      handleChange(room, index, "days", Number(e.target.value))
                    }
                    className="border rounded w-full p-2"
                  />
                </div>
              </div>

              <div className="mt-3">
                <p className="text-sm mb-1">Is the equipment on rent?</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`rent-${room}-${index}`}
                      checked={!item.isRented}
                      onChange={() =>
                        handleChange(room, index, "isRented", false)
                      }
                    />
                    No
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`rent-${room}-${index}`}
                      checked={item.isRented}
                      onChange={() =>
                        handleChange(room, index, "isRented", true)
                      }
                    />
                    Yes
                  </label>
                </div>
              </div>
            </div>
          ))}

          <div
            onClick={() => addEquipment(room)}
            className="border-dashed border-2 border-blue-300 text-blue-600 text-center py-3 rounded cursor-pointer hover:bg-blue-50"
          >
            Add more equipment
          </div>
        </div>
      ),
    }));

    setTabItems(newTabItems);
  }, [specifyArea, equipmentData]);

  return (
    <div className="pt-3">
      <AffectedModalHeader
        headline={"Select Required Equipment"}
        stripline={"Select Equipment for Restoration"}
      />
      <div className="rounded-lg bg-white p-6 mt-2 shadow-lg border border-[#E3E6ED]">
        {site.map((site, index) => (
          <div key={index}>
            <div className="font-semibold mb-4">{site}</div>
            <Tabs
              defaultActiveKey={tabItems[0]?.key}
              items={tabItems}
              tabPosition="top"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <Button onClick={() => moveNext(3)}>Previous</Button>
        <Button type="primary" onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default EquipmentDetails;
