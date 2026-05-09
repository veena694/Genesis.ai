"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGenerator = void 0;
const express_1 = require("express");
class ApiGenerator {
    static generateRoutes(config) {
        const router = (0, express_1.Router)();
        config.pages.forEach(page => {
            this.createRouteForPage(router, page);
        });
        return router;
    }
    static createRouteForPage(router, page) {
        const path = `/${page.name.toLowerCase()}`;
        router.get(path, (req, res) => {
            res.json({ message: `GET ${path} - Dynamic data for ${page.name}` });
        });
        router.post(path, (req, res) => {
            res.json({ message: `POST ${path} - Created resource for ${page.name}` });
        });
        router.put(`${path}/:id`, (req, res) => {
            res.json({ message: `PUT ${path}/${req.params.id} - Updated resource` });
        });
        router.delete(`${path}/:id`, (req, res) => {
            res.json({ message: `DELETE ${path}/${req.params.id} - Deleted resource` });
        });
    }
}
exports.ApiGenerator = ApiGenerator;
