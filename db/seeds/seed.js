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
function seed(_a) {
    var usersData = _a.usersData, katasData = _a.katasData, topicsData = _a.topicsData, solutionsData = _a.solutionsData, kataTopicsData = _a.kataTopicsData, commentsData = _a.commentsData;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, db.query("DROP TABLE IF EXISTS comments;")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS kata_topics;")];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS solutions;")];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS topics;")];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS katas;")];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS users;")];
                case 6:
                    _b.sent();
                    console.log(katasData);
                    return [4 /*yield*/, createUsers()];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, createKatas()];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, createTopics()];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, createSolutions()];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, createKataTopics()];
                case 11:
                    _b.sent();
                    return [4 /*yield*/, createComments()];
                case 12:
                    _b.sent();
                    return [4 /*yield*/, insertUsers(usersData)];
                case 13:
                    _b.sent();
                    return [4 /*yield*/, insertKatas(katasData)];
                case 14:
                    _b.sent();
                    return [4 /*yield*/, insertTopics(topicsData)];
                case 15:
                    _b.sent();
                    return [4 /*yield*/, insertSolutions(solutionsData)];
                case 16:
                    _b.sent();
                    return [4 /*yield*/, insertKataTopics(kataTopicsData)];
                case 17:
                    _b.sent();
                    return [4 /*yield*/, insertComments(commentsData)];
                case 18:
                    _b.sent();
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
function insertUsers(usersData) {
    return __awaiter(this, void 0, void 0, function () {
        var usersQuery, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usersQuery = format('INSERT INTO users (username, bio, avatar_img_url) VALUES %L RETURNING *;', usersData.map(function (_a) {
                        var username = _a.username, bio = _a.bio, avatar_img_url = _a.avatar_img_url;
                        return [username, bio, avatar_img_url];
                    }));
                    return [4 /*yield*/, db.query(usersQuery)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function insertKatas(katasData) {
    return __awaiter(this, void 0, void 0, function () {
        var katasQuery, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    katasQuery = format('INSERT INTO katas (kata_name, description, test_path, difficulty) VALUES %L RETURNING *;', katasData.map(function (_a) {
                        var kata_name = _a.kata_name, description = _a.description, test_path = _a.test_path, difficulty = _a.difficulty;
                        return [kata_name, description, test_path, difficulty];
                    }));
                    return [4 /*yield*/, db.query(katasQuery)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function insertTopics(topicsData) {
    return __awaiter(this, void 0, void 0, function () {
        var topicsQuery, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    topicsQuery = format('INSERT INTO topics (topic_name, description) VALUES %L RETURNING *;', topicsData.map(function (_a) {
                        var topic_name = _a.topic_name, description = _a.description;
                        return [topic_name, description];
                    }));
                    return [4 /*yield*/, db.query(topicsQuery)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function insertSolutions(solutionsData) {
    return __awaiter(this, void 0, void 0, function () {
        var solutionsQuery, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    solutionsQuery = format('INSERT INTO solutions (kata_id, user_id, solution) VALUES %L RETURNING *;', solutionsData.map(function (_a) {
                        var kata_id = _a.kata_id, user_id = _a.user_id, solution = _a.solution;
                        return [kata_id, user_id, solution];
                    }));
                    return [4 /*yield*/, db.query(solutionsQuery)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function insertKataTopics(kataTopicsData) {
    return __awaiter(this, void 0, void 0, function () {
        var kataTopicsQuery, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    kataTopicsQuery = format('INSERT INTO kata_topics (kata_id, topic_id) VALUES %L RETURNING *;', kataTopicsData.map(function (_a) {
                        var kata_id = _a.kata_id, topic_id = _a.topic_id;
                        return [kata_id, topic_id];
                    }));
                    return [4 /*yield*/, db.query(kataTopicsQuery)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function insertComments(commentsData) {
    return __awaiter(this, void 0, void 0, function () {
        var commentsQuery, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commentsQuery = format('INSERT INTO comments (user_id, kata_id, comment_body) VALUES %L RETURNING *;', commentsData.map(function (_a) {
                        var user_id = _a.user_id, kata_id = _a.kata_id, comment_body = _a.comment_body;
                        return [user_id, kata_id, comment_body];
                    }));
                    return [4 /*yield*/, db.query(commentsQuery)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
module.exports = { seed: seed };
