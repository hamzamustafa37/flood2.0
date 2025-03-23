import { Input, Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "../../common";
import { SearchOutlined } from "@ant-design/icons";
import { flooringMaterials, IJob, IAffectedArea } from "@/utils";
import { useAppDispatch } from "@/lib/hooks";
import { addMaterials, JobData } from "@/lib/features/job";
import AffectedModalFooter from "../../common/AffectedModalFooter";
import AffectedModalHeader from "../../common/AffectedModalHeader";
import { useSelector } from "react-redux";

interface ISpecifyDamage {
  selectedRooms: string[];
  selectedFloor: string;
  moveNext: (move: number) => void;
  setSelectedArea: (specifyArea: any) => void;
}

const SpecifyDamage = ({ moveNext, setSelectedArea }: ISpecifyDamage) => {
  const dispatch = useAppDispatch();
  const [tabItems, setTabItems] = useState<TabsProps["items"]>([]);
  const specifyArea = useSelector(JobData);
  const [showAllMaterialsIndex, setShowAllMaterialsIndex] = useState({
    tabNameShowMore: "",
    tabIndexShowMore: -1,
  });
  const [searchValue, setSearchValue] = useState({
    tabKey: "",
    id: -1,
    value: [] as string[],
  });
  const groupAffectedAreasBySite = (affectedAreas: Array<IAffectedArea>) => {
    return affectedAreas.reduce<
      Record<string, Record<string, IAffectedArea[]>>
    >((acc, area) => {
      const siteKey = area.siteType;
      if (!acc[siteKey]) {
        acc[siteKey] = {};
      }
      const roomKey = `${area.roomType}`;
      if (!acc[siteKey][roomKey]) {
        acc[siteKey][roomKey] = [];
      }
      acc[siteKey][roomKey].push(area);
      return acc;
    }, {});
  };

  const toggleMaterialSelection = (
    siteType: string,
    room: string,
    damagePart: string,
    material: string
  ) => {
    setSelectedArea((prev: any) => {
      const updatedAreas = [...prev.affectedAreas];
      const areaIndex = updatedAreas.findIndex(
        (area) =>
          area.siteType === siteType &&
          area.roomType === room &&
          area.damagePart === damagePart
      );

      if (areaIndex !== -1) {
        const existingMaterials = updatedAreas[areaIndex].materials || [];
        updatedAreas[areaIndex].materials = existingMaterials.includes(material)
          ? existingMaterials.filter((m: any) => m !== material)
          : [...existingMaterials, material];
      } else {
        updatedAreas.push({
          siteType,
          roomType: room,
          damagePart,
          materials: [material],
        });
      }

      return { ...prev, affectedAreas: updatedAreas };
    });
    console.log(damagePart, "==== the damage part");
    console.log(room, "=== room");
    dispatch(addMaterials({ siteType, roomType: room, damagePart, material }));
  };

  const onSearch = (value: string, index: number, tabKey: string) => {
    const filtered = flooringMaterials.filter((mat) =>
      mat.toLowerCase().includes(value.toLowerCase())
    );
    setSearchValue({ tabKey, id: index, value: filtered });
    setShowAllMaterialsIndex({ tabNameShowMore: "", tabIndexShowMore: -1 });
  };

  useEffect(() => {
    const groupedAreas = groupAffectedAreasBySite(specifyArea.affectedAreas);
    const newTabItems = Object.entries(groupedAreas).map(([site, rooms]) => ({
      key: site,
      label: site,
      children: (
        <div className="space-y-4">
          {Object.entries(rooms).map(([room, damages], roomIndex) => (
            <div key={`${site}-${room}-${roomIndex}`}>
              <h5 className="font-semibold text-xl mb-2"> {room}</h5>
              <div
                key={room}
                className="rounded-lg bg-white p-6 shadow-lg border border-[#E3E6ED] mt-4"
              >
                {damages.map(({ damagePart, materials }, damageIndex) => {
                  const materialsToShow =
                    damageIndex === searchValue.id &&
                    site === searchValue.tabKey
                      ? searchValue.value
                      : showAllMaterialsIndex.tabNameShowMore === site &&
                          damageIndex === showAllMaterialsIndex.tabIndexShowMore
                        ? flooringMaterials
                        : flooringMaterials.slice(0, 10);

                  return (
                    <div key={`${damagePart}`} className="mt-4">
                      <h4 className="font-semibold">{damagePart}</h4>
                      <Input
                        suffix={<SearchOutlined />}
                        onChange={(e) =>
                          onSearch(e.target.value, damageIndex, site)
                        }
                        className="my-2"
                      />
                      <div className="flex flex-wrap gap-2">
                        {materialsToShow.map((material, i) => (
                          <button
                            key={`${material}-${i}`}
                            className={`cursor-pointer border border-blue-200 bg-blue-100 rounded-full px-3 py-1 text-sm transition ${
                              materials.includes(material)
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                            }`}
                            onClick={() =>
                              toggleMaterialSelection(
                                site,
                                room,
                                damagePart,
                                material
                              )
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
                              tabNameShowMore: site,
                              tabIndexShowMore: damageIndex,
                            })
                          }
                        >
                          {showAllMaterialsIndex.tabNameShowMore === site &&
                          showAllMaterialsIndex.tabIndexShowMore === damageIndex
                            ? "Show Less"
                            : "Show More"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ),
    }));

    setTabItems(newTabItems);
  }, [showAllMaterialsIndex, searchValue, specifyArea]);

  return (
    <div className="pt-3">
      <AffectedModalHeader
        headline={"Specify Damage for Each Section"}
        stripline={
          "What specific parts of the [Flooring/Walling/Ceiling] are damaged?"
        }
      />
      <div className="affected-site-tab">
        {tabItems && tabItems.length > 0 && (
          <Tabs
            defaultActiveKey="0"
            items={tabItems}
            renderTabBar={(props, DefaultTabBar) => {
              const tabCount = tabItems.length;
              const gridTemplate = `repeat(${tabCount}, 1fr)`;
              return (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: gridTemplate,
                    width: "100%",
                  }}
                >
                  <DefaultTabBar {...props} />
                </div>
              );
            }}
          />
        )}
        <AffectedModalFooter
          previousPageNo={2}
          nextPageNo={4}
          specifyArea={specifyArea}
          moveNext={moveNext}
        />
      </div>
    </div>
  );
};

export default SpecifyDamage;
