import React from 'react';
import PropTypes from 'prop-types';

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

ConfirmationButton.propTypes = {
  isSummary: PropTypes.func.isRequired,
  updateOrderDetails: PropTypes.func.isRequired,
  updateDriverWithOrder: PropTypes.func.isRequired,
};

export default ConfirmationButton;
