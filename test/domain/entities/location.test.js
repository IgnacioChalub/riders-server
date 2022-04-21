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
Object.defineProperty(exports, "__esModule", { value: true });
const location_1 = require("../../../src/domain/entities/location");
test('test location is in radius', () => __awaiter(void 0, void 0, void 0, function* () {
    const startLocation = location_1.Location.create("1", "address", -34.411244, -58.663669);
    const coordsInRadius = [
        [-34.411244, -58.663669],
        [-34.4068654, -58.6578094],
        [-34.4131326, -58.6438508],
        [-34.441822, -58.579475],
        [-34.449111, -58.571548],
        [-34.420216, -58.769847],
    ];
    const coordsNotInRadius = [
        [34.411244, 58.663669],
        [-34.321244, -58.663669],
        [-34.420352, -58.775656]
    ];
    for (let i = 0; i < coordsInRadius.length; i++) {
        expect(startLocation.isInRadius(coordsInRadius[i][0], coordsInRadius[i][1], 10)).toBe(true);
    }
    for (let i = 0; i < coordsNotInRadius.length; i++) {
        expect(startLocation.isInRadius(coordsNotInRadius[i][0], coordsNotInRadius[i][1], 10)).toBe(false);
    }
}));
