import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IAffectedArea, IJob } from "@/utils";

export interface IJobSlice {
  job: IJob;
}

const initialState: IJobSlice = {
  job: {
    floor: [],
    roomType: [],
    affectedAreas: [],
  },
};

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addRooms: (state, action: PayloadAction<Array<string>>) => {
      state.job.roomType = [...action.payload];
    },
    addAffectedAreas: (state, action: PayloadAction<IAffectedArea>) => {
      const existingIndex = state.job.affectedAreas.findIndex(
        (area) =>
          area.roomType === action.payload.roomType &&
          area.damagePart === action.payload.damagePart
      );

      if (existingIndex === -1) {
        state.job.affectedAreas.push(action.payload);
      } else {
        state.job.affectedAreas.splice(existingIndex, 1);
      }
    },
    addMaterials: (
      state,
      action: PayloadAction<{
        roomType: string;
        damagePart: string;
        material: string;
      }>
    ) => {
      const { roomType, damagePart, material } = action.payload;
      const areaIndex = state.job.affectedAreas.findIndex(
        (area) => area.roomType === roomType && area.damagePart === damagePart
      );

      if (areaIndex !== -1) {
        const materials = state.job.affectedAreas[areaIndex].materials;
        if (materials.includes(material)) {
          state.job.affectedAreas[areaIndex].materials = materials.filter(
            (m) => m !== material
          );
        } else {
          state.job.affectedAreas[areaIndex].materials.push(material);
        }
      } else {
        state.job.affectedAreas.push({
          roomType,
          damagePart,
          materials: [material],
        });
      }
    },
  },
  selectors: {
    createdJob: (store) => store.job,
  },
});
export const { createdJob } = jobSlice.selectors;
export const { addRooms, addAffectedAreas, addMaterials } = jobSlice.actions;
export default jobSlice.reducer;
