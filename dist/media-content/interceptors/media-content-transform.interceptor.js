"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaContentTransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
let MediaContentTransformInterceptor = class MediaContentTransformInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const body = request.body;
        console.log('Interceptor - Original body:', body);
        if (body) {
            if ((body.allowedUses || body.restrictions) && !body.usageRights) {
                body.usageRights = {
                    allowedUses: body.allowedUses || [],
                    restrictions: body.restrictions || [],
                    attribution: body.attribution || false
                };
                delete body.allowedUses;
                delete body.restrictions;
                delete body.attribution;
            }
            if (body.usageRights) {
                if (typeof body.usageRights === 'string') {
                    try {
                        body.usageRights = JSON.parse(body.usageRights);
                    }
                    catch (error) {
                        console.error('Failed to parse usageRights JSON:', error);
                        body.usageRights = { allowedUses: [], restrictions: [], attribution: false };
                    }
                }
                if (body.usageRights && typeof body.usageRights === 'object') {
                    if (!Array.isArray(body.usageRights.allowedUses)) {
                        body.usageRights.allowedUses = body.usageRights.allowedUses ? [body.usageRights.allowedUses] : [];
                    }
                    if (!Array.isArray(body.usageRights.restrictions)) {
                        body.usageRights.restrictions = body.usageRights.restrictions ? [body.usageRights.restrictions] : [];
                    }
                    if (typeof body.usageRights.attribution !== 'boolean') {
                        body.usageRights.attribution = Boolean(body.usageRights.attribution);
                    }
                }
            }
            else {
                console.log('No usageRights provided in request body');
            }
            if (body.tags) {
                if (typeof body.tags === 'string') {
                    try {
                        body.tags = JSON.parse(body.tags);
                    }
                    catch (error) {
                        console.error('Failed to parse tags JSON:', error);
                        body.tags = [];
                    }
                }
                if (!Array.isArray(body.tags)) {
                    body.tags = [body.tags];
                }
            }
            if (body.categories) {
                if (typeof body.categories === 'string') {
                    try {
                        body.categories = JSON.parse(body.categories);
                    }
                    catch (error) {
                        console.error('Failed to parse categories JSON:', error);
                        body.categories = [];
                    }
                }
                if (!Array.isArray(body.categories)) {
                    body.categories = [body.categories];
                }
            }
            if (body.price) {
                if (typeof body.price === 'string') {
                    body.price = parseFloat(body.price);
                }
                if (isNaN(body.price)) {
                    body.price = 0;
                }
            }
            console.log('Interceptor - Transformed body:', body);
        }
        return next.handle();
    }
};
exports.MediaContentTransformInterceptor = MediaContentTransformInterceptor;
exports.MediaContentTransformInterceptor = MediaContentTransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], MediaContentTransformInterceptor);
//# sourceMappingURL=media-content-transform.interceptor.js.map