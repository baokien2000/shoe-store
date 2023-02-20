import { ShoesModel } from "../models/ShoesModel.js"
import shoesList from "./shoe.js"
export const getShoes = async (req, res) => {
    try {
        // shoesList.forEach(item => {
        //     const shoe = new ShoesModel(item)
        //     shoe.save();
        // })
        const shoes = await ShoesModel.find();
        res.status(200).json(shoes)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}


export const createShoes = async (req, res) => {
    try {
        const newShoes = req.body;

        const shoes = new ShoesModel(newShoes)
        await shoes.save()

        res.status(200).json(shoes)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export const UpdateShoes = async (req, res) => {
    try {
        const updateShoes = req.body;

        const shoes = new ShoesModel.findOneAndUpdate(
            { _id: updateShoes._id },
            updateShoes,
            { new: true }
        )

        res.status(200).json(shoes)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}