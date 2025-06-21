import Column from './column.model.js'

//Create new column
export const createColumn = async (req, res) => {
    try {
        const column = new Column(req.body);
        const savedColumn = await column.save();
        res.status(201).json(savedColumn);
    } catch (error) {
        console.log("Creating column failed: ", error);
        res.status(500).json({ error: error.message })
    }
}

//Get all column
export const getAllColumn = async (req, res) => {
    try {
        const columns = await Column.find().populate('tasks');
        res.json(columns);
    } catch (error) {
        console.log("Failed to fetch columns: ", error);
        res.status(400).json({ error: error.message })
    }
}

//Update column by id
export const updateColumnById = async (req, res) => {
    try {
        const updateColumn = await Column.findByIdAndUpdate(
            req.params.columnId,
            req.body,
            { new: true, runValidators: true }
        );
        

        if (!updateColumn) {
            return res.status(400).json({ message: 'Column not found' })
        }

        res.status(200).json({ message: 'Column updated successfully', task: updateColumn });
    } catch (error) {
        console.log("Failed to update column: ", error)

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: error.message })
    }
}

//Delete column by id
export const deleteColumnById = async (req, res) => {
    try{
        const deletedColumn = await Column.findByIdAndDelete(req.params.columnId);

        if(!deletedColumn){
            return res.status(404).json({message: 'Column not found'});
        }

        res.status(200).json({message: 'Column deleted successfully', column: deletedColumn})
    }catch(error){
        console.log("Failed to find column", error);
        res.status(500).json({error: error.message});
    }
}