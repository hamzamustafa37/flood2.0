import { Input, Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "../../common";
import { SearchOutlined } from "@ant-design/icons";
import { flooringMaterials, IJob, IAffectedArea } from "@/utils";
import { useAppDispatch } from "@/lib/hooks";
import { addMaterials } from "@/lib/features/job";

interface ISpecifyDamage {
  selectedRooms: string[];
  selectedFloor: string;
  specifyArea: IJob;
  moveNext: (move: number) => void;
  setSelectedArea: (specifyArea: any) => void;
}

const SpecifyDamage = ({
  specifyArea,
  moveNext,
  setSelectedArea,
}: ISpecifyDamage) => {
  const dispatch = useAppDispatch();
  const [tabItems, setTabItems] = useState<TabsProps["items"]>([]);
  const [showAllMaterialsIndex, setShowAllMaterialsIndex] = useState({
    tabNameShowMore: "",
    tabIndexShowMore: -1,
  });
  const [searchValue, setSearchValue] = useState({
    tabKey: "",
    id: -1,
    value: [] as string[],
  });

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

  const toggleMaterialSelection = (
    room: string,
    damagePart: string,
    material: string
  ) => {
    setSelectedArea((prev: any) => {
      const updatedAreas = [...prev.affectedAreas];
      const areaIndex = updatedAreas.findIndex(
        (area) => area.roomType === room && area.damagePart === damagePart
      );

      if (areaIndex !== -1) {
        const existingMaterials = updatedAreas[areaIndex].materials || [];
        updatedAreas[areaIndex].materials = existingMaterials.includes(material)
          ? existingMaterials.filter((m: any) => m !== material)
          : [...existingMaterials, material];
      } else {
        updatedAreas.push({
          roomType: room,
          damagePart,
          materials: [material],
        });
      }

      return { ...prev, affectedAreas: updatedAreas };
    });
    dispatch(addMaterials({ roomType: room, damagePart, material }));
  };

  const onSearch = (value: string, index: number, tabKey: string) => {
    const filtered = flooringMaterials.filter((mat) =>
      mat.toLowerCase().includes(value.toLowerCase())
    );
    setSearchValue({ tabKey, id: index, value: filtered });
    setShowAllMaterialsIndex({ tabNameShowMore: "", tabIndexShowMore: -1 });
  };

  useEffect(() => {
    const groupedAreas = groupAffectedAreas(specifyArea.affectedAreas);

    const newTabItems = Object.entries(groupedAreas).map(([room, damages]) => ({
      key: room,
      label: room,
      children: (
        <div className="space-y-4">
          {damages.map(({ damagePart, materials }, index) => {
            const materialsToShow =
              index === searchValue.id && room === searchValue.tabKey
                ? searchValue.value
                : showAllMaterialsIndex.tabNameShowMore === room &&
                    index === showAllMaterialsIndex.tabIndexShowMore
                  ? flooringMaterials
                  : flooringMaterials.slice(0, 10);

            return (
              <div key={index} className="border p-4 rounded-lg shadow">
                <h3 className="font-semibold text-lg">{damagePart}</h3>
                <Input
                  suffix={<SearchOutlined />}
                  onChange={(e) => onSearch(e.target.value, index, room)}
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {materialsToShow.map((material, i) => (
                    <button
                      key={`${material}-${i}`}
                      className={`cursor-pointer border rounded-full px-3 py-1 text-sm transition ${
                        materials.includes(material)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                      }`}
                      onClick={() =>
                        toggleMaterialSelection(room, damagePart, material)
                      }
                    >
                      {material}
                    </button>
                  ))}
                </div>
                {materialsToShow.length < flooringMaterials.length && (
                  <button
                    className="mt-3 text-blue-500 text-sm cursor-pointer"
                    onClick={() =>
                      setShowAllMaterialsIndex({
                        tabNameShowMore: room,
                        tabIndexShowMore: index,
                      })
                    }
                  >
                    {showAllMaterialsIndex.tabNameShowMore === room &&
                    showAllMaterialsIndex.tabIndexShowMore === index
                      ? "Show Less"
                      : "Show More"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ),
    }));

    setTabItems(newTabItems);
  }, [showAllMaterialsIndex, searchValue, specifyArea]);

  return (
    <div>
      {tabItems && tabItems.length > 0 && (
        <Tabs defaultActiveKey="0" items={tabItems} />
      )}
      <div className="mt-6 flex items-center justify-between">
        <p
          className="text-sm text-blue-500 cursor-pointer"
          onClick={() => moveNext(1)}
        >
          Previous
        </p>
        <Button
          onClick={() => moveNext(3)}
          className={`rounded-lg px-4 py-2 text-white ${
            specifyArea.affectedAreas.length > 0
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={specifyArea.affectedAreas.length === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SpecifyDamage;
