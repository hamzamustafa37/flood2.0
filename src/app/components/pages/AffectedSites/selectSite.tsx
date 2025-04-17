import React from "react";
import AffectedModalHeader from "../../common/AffectedModalHeader";
import { Button, Checkbox } from "antd";
import { IJob } from "@/utils";
import { TiTick } from "react-icons/ti";
import { useAppDispatch } from "@/lib/hooks";
import { addSites } from "@/lib/features/job";

interface ISiteSelect {
  specifyArea: IJob;
  setSelectedArea: (specifyArea: IJob) => void;
  moveNext: (move: number) => void;
}

const SelectSite = ({
  specifyArea,
  setSelectedArea,
  moveNext,
}: ISiteSelect) => {
  const dispatch = useAppDispatch();
  const options = ["Main Floor", "Basement", "Upstairs", "Other"];

  const onChange = (checked: boolean, value: string) => {
    let updatedSites = specifyArea.site || [];
    if (checked && !updatedSites.includes(value)) {
      updatedSites = [...updatedSites, value];
    } else if (!checked) {
      updatedSites = updatedSites.filter((site) => site !== value);
    }
    setSelectedArea({ ...specifyArea, site: updatedSites });
    dispatch(addSites(updatedSites));
  };

  const removeItem = (siteToRemove: string) => {
    const updatedSites = (specifyArea.site || []).filter(
      (site) => site !== siteToRemove
    );
    setSelectedArea({ ...specifyArea, site: updatedSites });
    dispatch(addSites(updatedSites));
  };

  const filteredOptions = options.filter(
    (option) => !specifyArea.site?.includes(option)
  );

  const moveNextStep = () => moveNext(1);

  return (
    <div className="rounded-lg bg-white p-6 mt-2 shadow-lg border border-[#E3E6ED]">
      <AffectedModalHeader
        headline={"Select Affected Rooms on the Floor"}
        stripline={"Which rooms on this floor are affected?"}
      />

      {specifyArea.site && specifyArea.site.length > 0 && (
        <div className="mb-4">
          <ul className="list-none">
            {specifyArea.site.map((item, index) => (
              <li
                key={index}
                className="flex justify-between text-[#003CC7] cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => removeItem(item)}
              >
                <p>{item}</p>
                <TiTick size={20} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <span className="font-semibold mb-2 inline-block">Add More Floors</span>
        <div className="space-y-2">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((site, index) => (
              <Checkbox
                key={index}
                checked={specifyArea.site?.includes(site)}
                onChange={(e) => onChange(e.target.checked, site)}
              >
                {site}
              </Checkbox>
            ))
          ) : (
            <p className="text-gray-500">All options selected.</p>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            onClick={moveNextStep}
            className={`rounded-lg px-4 py-2 text-white ${
              specifyArea.site.length > 0
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={specifyArea.site.length === 0}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectSite;
