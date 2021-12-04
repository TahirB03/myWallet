const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  amount: { type: Number, required: true },
  isDeposit: {type: Boolean, required: true},
  description: {type: String, required: true, maxLength: 100}
}, {timestamp: true});

module.exports = mongoose.model('Bill', billSchema);
