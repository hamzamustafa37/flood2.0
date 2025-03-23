import { IAffectedArea, IJob, imagesPath } from "@/utils";
import { Tabs, Upload, message, Modal } from "antd";
import { PlusOutlined, EyeOutlined, CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import React, { useState } from "react";
import AffectedModalFooter from "../../common/AffectedModalFooter";
import AffectedModalHeader from "../../common/AffectedModalHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  addAffectedAreaImages,
  removeAffectedAreaImage,
  JobData,
} from "@/lib/features/job";

interface ISpecifyDamage {
  moveNext: (move: number) => void;
}

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Only JPG/PNG files allowed!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const RoomImageUploader = ({ moveNext }: ISpecifyDamage) => {
  const dispatch = useDispatch();
  const specifyArea: IJob = useSelector(JobData);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const handleUploadAtIndex = (
    file: File,
    area: IAffectedArea,
    imageIndex: number
  ) => {
    if (beforeUpload(file)) {
      dispatch(
        addAffectedAreaImages({
          siteType: area.siteType,
          roomType: area.roomType,
          damagePart: area.damagePart,
          image: file,
          index: imageIndex,
        })
      );
      return false;
    }
    return false;
  };

  const handleRemoveImage = (area: IAffectedArea, index: number) => {
    dispatch(
      removeAffectedAreaImage({
        siteType: area.siteType,
        roomType: area.roomType,
        damagePart: area.damagePart,
        index,
      })
    );
  };

  const groupedAreas = specifyArea.affectedAreas.reduce<
    Record<string, IAffectedArea[]>
  >((acc, area) => {
    if (!acc[area.roomType]) {
      acc[area.roomType] = [];
    }
    acc[area.roomType].push(area);
    return acc;
  }, {});
  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const tabItems = Object.entries(groupedAreas).map(([room, damages]) => ({
    key: room,
    label: room,
    children: damages.map((damage) => {
      const sectionKey = `${room}-${damage.damagePart}`;
      const isExpanded = expandedSections[sectionKey] ?? true;

      return (
        <div key={damage.damagePart} className="mb-8">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-base mb-2">
              {room} - {damage.damagePart}
            </h3>
            <div
              className="cursor-pointer text-xl font-bold"
              onClick={() => toggleSection(sectionKey)}
            >
              {isExpanded ? "-" : "+"}
            </div>
          </div>
          {isExpanded ? (
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="relative group">
                  {damage.images && damage.images[index] ? (
                    <>
                      <Image
                        src={URL.createObjectURL(damage.images[index])}
                        alt={`Damage ${index + 1}`}
                        width={150}
                        height={150}
                        className="object-cover w-full h-36 rounded-lg"
                      />
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <EyeOutlined
                          className="text-white bg-black/60 rounded-full p-1 cursor-pointer"
                          onClick={() =>
                            setPreviewImage(
                              URL.createObjectURL(damage.images[index])
                            )
                          }
                        />
                        <CloseOutlined
                          className="text-white bg-red-500 rounded-full p-1 cursor-pointer"
                          onClick={() => handleRemoveImage(damage, index)}
                        />
                      </div>
                    </>
                  ) : (
                    <Upload
                      showUploadList={false}
                      beforeUpload={(file) =>
                        handleUploadAtIndex(file, damage, index)
                      }
                      customRequest={() => {}}
                    >
                      <div className="border border-gray-300 rounded-lg h-36 flex flex-col justify-center items-center cursor-pointer hover:border-blue-400">
                        <PlusOutlined className="text-2xl mb-1" />
                        <span className="text-sm">Upload</span>
                      </div>
                    </Upload>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              Click + the icon to expand
            </div>
          )}
        </div>
      );
    }),
  }));

  return (
    <div className="pt-3">
      <AffectedModalHeader
        headline="Upload images of the damaged areas"
        stripline="Take or upload photos from each corner of the room for a complete assessment."
      />
      <div className="flex justify-center">
        <Image
          src={imagesPath.positionIcon}
          alt="position-icon"
          width={250}
          height={300}
          className="w-full sm:w-64"
        />
      </div>
      <div className="rounded-lg bg-white p-6 mt-2 shadow-lg border border-[#E3E6ED]">
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          tabPosition="top"
          tabBarStyle={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        />
      </div>
      <AffectedModalFooter
        previousPageNo={3}
        nextPageNo={5}
        specifyArea={specifyArea}
        moveNext={moveNext}
      />
      <Modal
        open={!!previewImage}
        footer={null}
        onCancel={() => setPreviewImage(null)}
        centered
      >
        {previewImage && (
          <Image
            src={previewImage}
            alt="Preview"
            width={600}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        )}
      </Modal>
    </div>
  );
};

export default RoomImageUploader;
