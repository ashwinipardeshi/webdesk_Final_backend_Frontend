/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SnackbarKey } from 'notistack';
import { RootState } from '.';

export type Notification = {
  key: SnackbarKey;
  message: string;
  options: {
    variant?: 'warning' | 'error' | 'info' | 'success';
    onClose?: Function;
    // action?: ReactElement;
  };
  dismissed: boolean;
  open:boolean
};

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

export const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    add: (
      state,
      action: PayloadAction<{
        key: SnackbarKey;
        message: string;
        variant?: 'warning' | 'error' | 'info' | 'success';
        onClose?: Function;
        open?:boolean
      }>
    ) => {
      const {
        key = new Date().getTime() + Math.random(),
        message,
        variant = 'info',
        onClose = () => {
          // do nothing.
        },
        open
      } = action.payload;
      state.notifications.push({
        key,
        message,
        open:true,
        options: {
          variant,
          onClose,
          // action: React.createElement('div', null, 'dismiss me'),
        },
        dismissed: false,
        
      });
    },
    // quick actions
    // todo handle objects?
    // todo add quick actions for info and warning when needed
    addError: (state, action: PayloadAction<string>) => {
      state.notifications.push({
        key: new Date().getTime() + Math.random(),
        message: action.payload,
        options: {
          variant: 'error',
        },
        dismissed: false,
        open:true
      });
    },
    addSuccess: (state, action: PayloadAction<string>) => {
      state.notifications.push({
        key: new Date().getTime() + Math.random(),
        message: action.payload,
        options: {
          variant: 'success',
          // action: React.createElement('div', null, 'dismiss me'),
        },
        dismissed: false,
        open:true
      });
    },
    dismiss: (state, action: PayloadAction<SnackbarKey>) => {
      state.notifications = state.notifications.filter(
        (n) => n.key !== action.payload
      );
    },
  },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNotifications = (state: RootState) =>
  state.notifications.notifications;
