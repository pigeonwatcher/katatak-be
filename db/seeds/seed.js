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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var format = require("pg-format");
var db = require("../connection").db;
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.query("DROP TABLE IF EXISTS comments;")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS kata_topics;")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS solutions;")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS topics;")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS katas;")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS users;")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, createUsers()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, createKatas()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, createTopics()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, createSolutions()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, createKataTopics()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, createComments()];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, insertUsers()];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, insertKatas()];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, insertTopics()];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, insertSolutions()];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, insertKataTopics()];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, insertComments()];
                case 18:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createUsers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.query("CREATE TABLE users \n        (user_id SERIAL PRIMARY KEY,\n        username VARCHAR(20) NOT NULL,\n        bio VARCHAR(150),\n        avatar_img_url VARCHAR)")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function createKatas() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.query("CREATE TABLE katas\n        (kata_id SERIAL PRIMARY KEY,\n            kata_name VARCHAR NOT NULL,\n            description TEXT NOT NULL,\n            test_path VARCHAR NOT NULL,\n            difficulty VARCHAR NOT NULL,\n            date_created TIMESTAMP DEFAULT NOW(),\n            votes INT DEFAULT 0 NOT NULL)")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function createTopics() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.query("CREATE TABLE topics \n        (topic_id SERIAL PRIMARY KEY,\n          topic_name VARCHAR(20) NOT NULL,\n          description TEXT)")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function createSolutions() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.query("CREATE TABLE solutions\n  (solution_id SERIAL PRIMARY KEY,\n    user_id INT REFERENCES users(user_id) NOT NULL,\n    kata_id INT REFERENCES katas(kata_id) NOT NULL,\n    solution TEXT NOT NULL,\n    votes INT DEFAULT 0 NOT NULL\n    )")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function createKataTopics() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.query("CREATE TABLE kata_topics\n  (kata_topics_id SERIAL PRIMARY KEY,\n    kata_id INT REFERENCES katas(kata_id) NOT NULL,\n    topic_id INT REFERENCES topics(topic_id) NOT NULL\n    )")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function createComments() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.query("CREATE TABLE comments\n  (comment_id SERIAL PRIMARY KEY,\n    user_id INT REFERENCES users(user_id),\n    kata_id INT REFERENCES katas(kata_id),\n    comment_body TEXT NOT NULL,\n    date_created TIMESTAMP DEFAULT NOW()\n    )")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function insertUsers() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
function insertKatas() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
function insertTopics() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
function insertSolutions() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
function insertKataTopics() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
function insertComments() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
module.exports = { seed: seed };
