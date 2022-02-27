const { Order } = require("../../../models/order");
const updateOrderInputValidator = require("../../validators/orderValidators/updateOrderInputValidator");
async function updateOrderMiddleware(req, res, next) {
    try {
        const isRequestValid = updateOrderInputValidator(req);
        if (!isRequestValid) return res.status(400).json({ message: "Bad Request" });
        const order = await Order.findById(req.params.id).populate({ path: "orderItems", populate: { path: "product" } });
        if (!order) return res.status(404).send("the order isn't found!");
        const orderItemsHaveLessCodes = order.orderItems.filter((orderItem) => orderItem.quantity > orderItem.product.licenceStock);
        if (orderItemsHaveLessCodes.length && req.body.status === "3") return res.status(500).json({ message: "No enough available licenses for this process" });
        else next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}
module.exports = updateOrderMiddleware;
