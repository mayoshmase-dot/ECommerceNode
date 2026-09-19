import slugify from 'slugify'
import categoryModel from '../../../DB/models/category.model.js'
import cloudinary from '../../utils/cloudinary.js'
import productModel from '../../../DB/models/product.model.js'

export const create = async (req, res) => {
    const { name, categoryId } = req.body

    const checkCategory = await categoryModel.findById(categoryId)

    if (!checkCategory) {
        return res.status(404).json({
            message: "category not found"
        })
    }

    req.body.slug = slugify(name)

    const { secure_url, public_id } =
        await cloudinary.uploader.upload(
            req.files.mainImage[0].path,
            { folder: `Ecommerce/products/${name}` }
        )

    req.body.subImage = []

    if (req.files.subImage) {
        for (const file of req.files.subImage) {

            const { secure_url, public_id } =
                await cloudinary.uploader.upload(
                    file.path,
                    { folder: `Ecommerce/products/${name}/subImage` }
                )

            req.body.subImage.push({
                secure_url,
                public_id
            })
        }
    }

    req.body.mainImage = {
        secure_url,
        public_id
    }

    req.body.createdBy = req.id
    req.body.updatedBy = req.id

    const product = await productModel.create(req.body)

    return res.status(201).json({
        message: "success",
        product
    })
}
export const get = async (req, res) => {

    const products = await productModel.find({})

    return res.status(200).json({message: "success", products })
}
export const getActive = async (req, res) => {

    const products = await productModel.find({status:"active"}).select('-discount')

    return res.status(200).json({message: "success", products })
}
export const getDetails = async (req, res) => {
const {id} = req.params
    const products = await productModel.findById(id)
    return res.status(200).json({message: "success", products })
}
