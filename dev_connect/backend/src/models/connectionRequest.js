const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//* Compound index
connectionSchema.index({ fromUserId: 1, toUserId: 1 });

connectionSchema.pre("save", function (next) {
  const connectionRequest = this;

  //* Check if fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connetion request to yourself");
  }
  next();
});

const ConnectionRequest = new mongoose.model(
  "ConnectionRequestModel",
  connectionSchema
);

module.exports = { ConnectionRequest };
