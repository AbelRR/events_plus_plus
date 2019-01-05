import React from 'react';

function ConfirmationButton({
  isSummary,
  updateOrderDetails,
  updateDriverWithOrder,
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
          <button type="button" onClick={e => updateDriverWithOrder(e)}>
            REMIND DRIVER!
          </button>
        )
      }
    </div>
  );
}

export default ConfirmationButton;
