import mongoose from 'mongoose';

const worklogSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: [true, 'Ticket ID is required'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    timeSpent: {
      type: Number,
      required: [true, 'Time spent is required'],
      min: [1, 'Time spent must be at least 1 minute'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
worklogSchema.index({ ticketId: 1 });
worklogSchema.index({ userId: 1 });
worklogSchema.index({ date: -1 });

const Worklog = mongoose.model('Worklog', worklogSchema);

export default Worklog;

