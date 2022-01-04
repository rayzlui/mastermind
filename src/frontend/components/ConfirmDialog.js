import React, { useRef } from "react";
import { Button } from "@vechaiui/react";
import { Dialog } from "@headlessui/react";
import PropTypes from "prop-types";

export function ConfirmDialog(props) {
  let { showDialog, confirmLeaveGame, toggleDialog } = props;
  let noButtonRef = useRef(null);
  return (
    <Dialog
      as="div"
      initialFocus={noButtonRef}
      open={showDialog}
      onClose={() => {
        toggleDialog(false);
      }}
      className="fixed z-modal inset-0 h-2/4 w-1/3 left-1/3 top-1/4 border rounded"
    >
      <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-blackAlpha-800" />

      <div className="relative p-4 flex flex-col w-full rounded bg-white border">
        <div className="mb-2">
          <Dialog.Title className="text-lg font-semibold">
            Are you sure you want to leave the game?
          </Dialog.Title>
          <Button
            className="mt-4"
            variant="solid"
            onClick={(e) => {
              confirmLeaveGame();
              toggleDialog(false);
              e.preventDefault();
            }}
          >
            Yes
          </Button>
          <Button
            ref={noButtonRef}
            className="mt-4"
            variant="solid"
            onClick={(e) => {
              toggleDialog(false);
              e.preventDefault();
            }}
          >
            No
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  showDialog: PropTypes.bool,
  confirmLeaveGame: PropTypes.func,
  toggleDialog: PropTypes.func,
};
