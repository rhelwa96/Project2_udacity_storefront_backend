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
var product_models_1 = __importDefault(require("../../models/product.models"));
var p_model = new product_models_1.default();
describe('product Model', function () {
    it('create product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, p_model.create({
                        product_name: 'flower',
                        product_description: 'Lovel Flower',
                        product_link: 'http:/pro.com',
                        product_price: 20,
                        product_category: 'Orchid',
                    })];
                case 1:
                    product = _a.sent();
                    expect(product.product_name).toEqual('flower');
                    return [2 /*return*/];
            }
        });
    }); });
    it('update product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var products, productId, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, p_model.RetrieveAll()];
                case 1:
                    products = _a.sent();
                    productId = products[0].id;
                    return [4 /*yield*/, p_model.updateSingle({
                            id: productId,
                            product_name: 'red rose',
                            product_description: 'blouse of roses',
                            product_link: 'http:/pro2.com',
                            product_price: 50,
                            product_category: 'Orchid-2',
                        })];
                case 2:
                    product = _a.sent();
                    expect(product.product_name).toEqual('red rose');
                    return [2 /*return*/];
            }
        });
    }); });
    it('list of products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, p_model.RetrieveAll()];
                case 1:
                    product = _a.sent();
                    expect(product.length).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('return selected product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var products, productId, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, p_model.RetrieveAll()];
                case 1:
                    products = _a.sent();
                    productId = products[0].id;
                    return [4 /*yield*/, p_model.RetrieveSingle(productId)];
                case 2:
                    product = _a.sent();
                    expect(product.product_name).toEqual('red rose');
                    return [2 /*return*/];
            }
        });
    }); });
    it(' delete the product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var products, productId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, p_model.RetrieveAll()];
                case 1:
                    products = _a.sent();
                    productId = products[0].id;
                    return [4 /*yield*/, p_model.deleteSingle(productId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, p_model.RetrieveAll()];
                case 3:
                    products = _a.sent();
                    expect(products.length).toEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
