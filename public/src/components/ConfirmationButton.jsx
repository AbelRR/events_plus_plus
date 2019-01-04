import React from 'react';

function ConfirmationButton({
  isSummary,
  updateOrderDetails
}) {
  return (
    <div>
      {isSummary
        ? (
          <button type="button" onClick={e => updateOrderDetails(e)}>
            SEND SUMMARY
          </button>
        )
        : (
          <button type="button">
            REMIND DRIVER!
          </button>
        )
      }
    </div>
  );
}

export default ConfirmationButton;
