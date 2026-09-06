import mongoose, { model, Schema, Types } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true, min: 3, max: 50 },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    status: { type: String, enum: ["active", "not_active"], default: 'active' },
    stock: { type: Number, default: 1 },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    minImage: { type: Object },
    subImage: { type: Object },
    colors: [String],
    size: {
        type: [String],
        enum: ['small', 'medium', 'large', 'xlarge']
    },
    createdBy: { type: Types.ObjectId, ref: 'User' },
    updatedBy: { type: Types.ObjectId, ref: 'User' },
    categoryId: { type: Types.ObjectId, ref: 'Category' }
}, {
    timestamps: true
})

const productModel = mongoose.models.Product || model('Product', productSchema)
export default productModel