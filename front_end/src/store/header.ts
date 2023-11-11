/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

interface HeaderState {
  carts: any; // tbd
}

const initialState: HeaderState = {
  carts: [],
};

export const slice = createSlice({
  name: "header",
  initialState,
  reducers: {
    cartreducer: (state = initialState, action: PayloadAction<any>) => {
      switch (action.type) {
        case "ADD_CART":
          const IteamIndex = state.carts.findIndex(
            (iteam: any) => iteam.id === action.payload.id
          );

          if (IteamIndex >= 0) {
            state.carts[IteamIndex].qnty += 1;
            return {
              ...state,
              carts: [...state.carts],
            };
          } else {
            const temp = { ...action.payload, qnty: 1 };
            return {
              ...state,
              carts: [...state.carts, temp],
            };
          }

        case "RMV_CART":
          const data = state.carts.filter(
            (el: any) => el.id !== action.payload
          );
          // console.log(data);
          return {
            ...state,
            carts: data,
          };

        case "RMV_ONE":
          const IteamIndex_dec = state.carts.findIndex(
            (iteam: any) => iteam.id === action.payload.id
          );

          if (state.carts[IteamIndex_dec].qnty >= 1) {
            const deleteiteams = (state.carts[IteamIndex_dec].qnty -= 1);
            console.log([...state.carts, deleteiteams]);

            return {
              ...state,
              carts: [...state.carts],
            };
          } else if (state.carts[IteamIndex_dec].qnty === 1) {
            const data = state.carts.filter(
              (el: any) => el.id !== action.payload
            );

            return {
              ...state,
              carts: data,
            };
          }
          break;

        default:
          return state;
      }
    },
  },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectHeader = (state: RootState) => state.header;
export const getCartreducer = createSelector(
  selectHeader,
  (state) => state.carts
);
