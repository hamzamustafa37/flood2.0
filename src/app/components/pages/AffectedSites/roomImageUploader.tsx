import { IAffectedArea, IJob, imagesPath } from "@/utils";
import { Tabs, Upload, Button, UploadProps, GetProp, message } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface ISpecifyDamage {
  selectedRooms: string[];
  selectedFloor: string;
  specifyArea: IJob;
  moveNext: (move: number) => void;
  setSelectedArea: (specifyArea: any) => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: File, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const RoomImageUploader = ({ specifyArea }: ISpecifyDamage) => {
  const [tabItems, setTabItems] = useState<any[]>([]);
  const [images, setImages] = useState<
    Record<string, Record<string, string[]>>
  >({});
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done" && info.file.originFileObj) {
      getBase64(info.file.originFileObj as File, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  useEffect(() => {
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

    const groupedAreas = groupAffectedAreas(specifyArea.affectedAreas);

    const newTabItems = Object.entries(groupedAreas).map(([room, damages]) => ({
      key: room,
      label: room,
      children: (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{room}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((imgSrc, i) => (
              <div key={i} className="damage-uploader">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      className="w-full h-auto"
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
            ))}
          </div>
        </div>
      ),
    }));

    setTabItems(newTabItems);
  }, [specifyArea, images]);

  const handleImageUpload = (file: File, room: string, damagePart: string) => {
    const newImageUrl = URL.createObjectURL(file);

    setImages((prev) => ({
      ...prev,
      [room]: {
        ...prev[room],
        [damagePart]: [...(prev[room]?.[damagePart] || []), newImageUrl],
      },
    }));
  };

  return (
    <div className="pt-3">
      <div className="text-center">
        <h2 className="text-xl font-bold">
          Upload images of the damaged areas
        </h2>
        <p className="px-3 text-textLink">
          Take or upload photos from each corner of the room for a complete
          assessment.
        </p>
      </div>
      <div className="flex justify-center">
        <Image
          src={imagesPath.positionIcon}
          alt="position-icon"
          width={250}
          height={300}
          className="w-full sm:w-64"
        />
      </div>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          tabBarStyle={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
          tabPosition="top"
        />
      </div>
    </div>
  );
};

export default RoomImageUploader;
