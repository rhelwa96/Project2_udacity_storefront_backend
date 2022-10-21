"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_models_1 = __importDefault(require("../../models/order.models"));
var product_models_1 = __importDefault(require("../../models/product.models"));
var user_models_1 = __importDefault(require("../../models/user.models"));
var order_Model = new order_models_1.default();
var product_Model = new product_models_1.default();
var user_Model = new user_models_1.default();
var userId = "";
var productId = "";
var orderId = "";
describe('Order Model', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_Model.create({
                        username: 'flasjteam',
                        first_name: 'barry',
                        last_name: 'allem',
                        password_digest: 'test123',
                        email: "tes@gg.com"
                    })];
                case 1:
                    user = _a.sent();
                    userId = user.id;
                    return [4 /*yield*/, product_Model.create({
                            product_name: 'orchid',
                            product_price: 40.0,
                            product_category: 'Orchide',
                            product_description: "lovel sprayed rose",
                            product_link: "httproduc.com/1"
                        })];
                case 2:
                    product = _a.sent();
                    productId = product.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, product_Model.deleteSingle(productId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, user_Model.deleteSingle(userId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('create order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_Model.create({
                        user_id: userId,
                        order_status: 'ACTIVE',
                    })];
                case 1:
                    result = _a.sent();
                    expect(result.order_status).toEqual('ACTIVE');
                    return [2 /*return*/];
            }
        });
    }); });
    it('list of orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_Model.RetrieveAll()];
                case 1:
                    orders = _a.sent();
                    expect(orders.length).toBeGreaterThanOrEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
