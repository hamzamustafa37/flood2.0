import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ApiActions, IAffectedArea, IJob, JobType } from "@/utils";
import { AppThunk } from "@/lib/store";
import { endLoading, startLoading } from "../global";
import { getJobs } from "./jobApi";
import { AxiosError } from "axios";
import { errorPopup } from "@/app/components/common";

export interface IJobSlice {
  job: IJob;
  allJobs: Array<JobType>;
}

const initialState: IJobSlice = {
  job: {
    site: [],
    floor: [],
    roomType: [],
    affectedAreas: [],
  },
  allJobs: [],
};

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addSites: (state, action: PayloadAction<Array<string>>) => {
      state.job.site = action.payload;
      action.payload.forEach((site) => {
        const existingIndex = state.job.affectedAreas.findIndex(
          (area) => area.siteType === site
        );

        if (existingIndex === -1) {
          state.job.affectedAreas.push({
            siteType: site,
            roomType: "",
            damagePart: "",
            images: [],
            materials: [],
          });
        }
      });
      state.job.affectedAreas = state.job.affectedAreas.filter((area) =>
        state.job.site.includes(area.siteType)
      );
    },
    addRooms: (
      state,
      action: PayloadAction<{ siteType: string; room: string }>
    ) => {
      const { siteType, room } = action.payload;
      const existingIndex = state.job.affectedAreas.findIndex(
        (area) => area.siteType === siteType && area.roomType === room
      );

      if (existingIndex !== -1) {
        state.job.affectedAreas.splice(existingIndex, 1);
      } else {
        const emptyRoomIndex = state.job.affectedAreas.findIndex(
          (area) => area.siteType === siteType && area.roomType === ""
        );

        if (emptyRoomIndex !== -1) {
          state.job.affectedAreas[emptyRoomIndex].roomType = room;
        } else {
          state.job.affectedAreas.push({
            siteType,
            roomType: room,
            damagePart: "",
            materials: [],
            images: [],
          });
        }
      }
    },

    addAffectedAreas: (state, action: PayloadAction<IAffectedArea>) => {
      const { siteType, roomType, damagePart } = action.payload;

      const existingDamageIndex = state.job.affectedAreas.findIndex(
        (area) =>
          area.siteType === siteType &&
          area.roomType === roomType &&
          area.damagePart === damagePart
      );

      if (existingDamageIndex !== -1) {
        state.job.affectedAreas.splice(existingDamageIndex, 1);
      } else {
        const emptyEntryIndex = state.job.affectedAreas.findIndex(
          (area) =>
            area.siteType === siteType &&
            area.roomType === roomType &&
            area.damagePart === ""
        );

        if (emptyEntryIndex !== -1) {
          state.job.affectedAreas[emptyEntryIndex].damagePart = damagePart;
        } else {
          state.job.affectedAreas.push(action.payload);
        }
      }
    },

    addMaterials: (
      state,
      action: PayloadAction<{
        siteType: string;
        roomType: string;
        damagePart: string;
        material: string;
      }>
    ) => {
      const { siteType, roomType, damagePart, material } = action.payload;
      const exactIndex = state.job.affectedAreas.findIndex(
        (area) =>
          area.siteType === siteType &&
          area.roomType === roomType &&
          area.damagePart === damagePart
      );
      const emptyDamageIndex = state.job.affectedAreas.findIndex(
        (area) =>
          area.siteType === siteType &&
          area.roomType === roomType &&
          area.damagePart === ""
      );
      if (exactIndex !== -1) {
        const materials = state.job.affectedAreas[exactIndex].materials;
        if (materials.includes(material)) {
          state.job.affectedAreas[exactIndex].materials = materials.filter(
            (m) => m !== material
          );
        } else {
          state.job.affectedAreas[exactIndex].materials.push(material);
        }
      } else if (emptyDamageIndex !== -1) {
        state.job.affectedAreas[emptyDamageIndex].damagePart = damagePart;
        state.job.affectedAreas[emptyDamageIndex].materials = [material];
      } else {
        state.job.affectedAreas.push({
          siteType,
          roomType,
          damagePart,
          materials: [material],
          images: [],
        });
      }
    },

    addAffectedAreaImages: (
      state,
      action: PayloadAction<{
        siteType: string;
        roomType: string;
        damagePart: string;
        image: File;
        index: number;
      }>
    ) => {
      const { siteType, roomType, damagePart, image, index } = action.payload;
      const foundIndex = state.job.affectedAreas.findIndex(
        (area) =>
          area.siteType === siteType &&
          area.roomType === roomType &&
          area.damagePart === damagePart
      );
      if (foundIndex !== -1) {
        const imagesArray = state.job.affectedAreas[foundIndex].images;
        // Set image at the exact index
        imagesArray[index] = image;
      } else {
        const newImagesArray: Array<File> = [];
        newImagesArray[index] = image;
        state.job.affectedAreas.push({
          siteType,
          roomType,
          damagePart,
          images: newImagesArray,
          materials: [],
        });
      }
    },

    removeAffectedAreaImage: (
      state,
      action: PayloadAction<{
        siteType: string;
        roomType: string;
        damagePart: string;
        index: number;
      }>
    ) => {
      const { siteType, roomType, damagePart, index } = action.payload;
      const foundIndex = state.job.affectedAreas.findIndex(
        (area) =>
          area.siteType === siteType &&
          area.roomType === roomType &&
          area.damagePart === damagePart
      );
      if (foundIndex !== -1) {
        state.job.affectedAreas[foundIndex].images.splice(index, 1);
      }
    },
    setAllJobs: (state, action: PayloadAction<JobType[]>) => {
      state.allJobs = action.payload;
    },
  },
  selectors: {
    createdJob: (store) => store.job,
    JobData: (job) => job.job,
    allJobsData: (job) => job.allJobs,
  },
});

export const { createdJob, JobData, allJobsData } = jobSlice.selectors;
export const {
  addSites,
  addRooms,
  addAffectedAreas,
  addMaterials,
  addAffectedAreaImages,
  removeAffectedAreaImage,
  setAllJobs,
} = jobSlice.actions;
export default jobSlice.reducer;

export const _getJobs =
  (page: number = 1, limit: number = 10): AppThunk =>
  (dispatch) => {
    dispatch(startLoading({ key: ApiActions.GET_JOBS }));
    getJobs(page, limit)
      .then((response) => {
        console.log(response, "The response");
        dispatch(setAllJobs(response.data));
        dispatch(endLoading({ key: ApiActions.GET_JOBS }));
      })
      .catch((err) => {
        const error = err as AxiosError;
        dispatch(endLoading({ key: ApiActions.GET_JOBS }));
        errorPopup(error.message);
      });
  };
