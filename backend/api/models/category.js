const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    categoryName: {
      type: String,
      enum: [
        'Wage',
        'Tips/Lottary',
        'Monthly Bills',
        'Healthcare',
        'Fun',
        'Transportation',
        'Maintenance',
      ],
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('Category', categorySchema);
