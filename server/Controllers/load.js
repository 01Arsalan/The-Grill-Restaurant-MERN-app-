import DataModel from "../Models/load.js";

const loadData = async (req,res) => {
    
    const data = await DataModel.find({})
    res.send(data)
}

export default loadData;