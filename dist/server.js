"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db = __importStar(require("./TranscriptManager"));
const app = (0, express_1.default)();
const inputPort = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
db.initialize();
app.get('/transcripts', (_req, res) => {
    res.status(200).send(db.getAll());
});
app.post('/transcripts', (req, res) => {
    const name = req.body.name;
    if (!name || typeof name !== 'string') {
        return res.status(400).send('Missing or invalid "name"');
    }
    const id = db.addStudent(name);
    res.status(200).send({ studentID: id });
});
app.get('/transcripts/:id', (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id))
        return res.status(400).send('Invalid id');
    const transcript = db.getTranscript(id);
    if (!transcript)
        return res.status(404).send(`No student with id = ${id}`);
    res.status(200).send(transcript);
});
app.post('/transcripts/:id/:course', (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    const course = req.params.course;
    const grade = Number.parseInt(String(req.body.grade), 10);
    if (Number.isNaN(id))
        return res.status(400).send('Invalid id');
    if (!course)
        return res.status(400).send('Missing course');
    if (Number.isNaN(grade))
        return res.status(400).send('Invalid grade');
    try {
        db.addGrade(id, course, grade);
        res.sendStatus(200);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
app.get('/transcripts/:id/:course', (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    const course = req.params.course;
    if (Number.isNaN(id))
        return res.status(400).send('Invalid id');
    try {
        const grade = db.getGrade(id, course);
        res.status(200).send({ studentID: id, course, grade });
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
app.get('/studentids', (req, res) => {
    const name = req.query.name;
    if (!name)
        return res.status(400).send('Missing "name" query parameter');
    const ids = db.getStudentIDs(name);
    res.status(200).send(ids);
});
app.delete('/transcripts/:id', (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id))
        return res.status(400).send('Invalid id');
    try {
        db.deleteStudent(id);
        res.sendStatus(200);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});
app.use((_req, res) => res.sendStatus(404));
app.listen(inputPort, () => {
    console.log(`Express server now listening on localhost:${inputPort}`);
});
