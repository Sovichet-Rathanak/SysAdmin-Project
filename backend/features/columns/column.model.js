import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
    columnTitle: {
        type: String,
        required: true
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

//Join
columnSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'columnId'
});

//Cascade delete
columnSchema.pre('findOneAndDelete', async function () {
    try {
        const columnId = this.getQuery()['_id'];
        await mongoose.model('Task').deleteMany({ columnId });
    } catch (error) {
        console.log("Failed to delete column: ", error)
    }
});

export default mongoose.model('Column', columnSchema);