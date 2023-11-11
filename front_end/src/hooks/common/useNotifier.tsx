import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar, SnackbarKey } from "notistack";

import {
  actions,
  selectNotifications,
  Notification,
} from "../../store/notifications";

let displayed: SnackbarKey[] = [];

const useNotifier = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  useEffect(() => {
    notifications.forEach((n: Notification) => {
      const { key, message, options = {}, dismissed = false } = n;
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key);
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return;

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        // todo dismiss button
        // action: (myKey) =>
        //   React.createElement(
        //     'a',
        //     {
        //       onClick: () => {
        //         dispatch(actions.dismiss(myKey));
        //       },
        //     },
        //     'dismiss'
        //   ),
        autoHideDuration: 3000,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(actions.dismiss(myKey));
          removeDisplayed(myKey);
        },
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useNotifier;
