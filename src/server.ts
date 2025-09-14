import express from 'express';
import cors from 'cors';
import * as db from './TranscriptManager';

const app = express();
const inputPort = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.initialize();

app.get('/transcripts', (_req, res) => {
  res.status(200).send(db.getAll());
});

app.post('/transcripts', (req, res) => {
  const name: string = req.body.name;
  if (!name || typeof name !== 'string') {
    return res.status(400).send('Missing or invalid "name"');
  }
  const id = db.addStudent(name);
  res.status(200).send({ studentID: id });
});

app.get('/transcripts/:id', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).send('Invalid id');
  const transcript = db.getTranscript(id);
  if (!transcript) return res.status(404).send(`No student with id = ${id}`);
  res.status(200).send(transcript);
});

app.post('/transcripts/:id/:course', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const course = req.params.course;
  const grade = Number.parseInt(String(req.body.grade), 10);
  if (Number.isNaN(id)) return res.status(400).send('Invalid id');
  if (!course) return res.status(400).send('Missing course');
  if (Number.isNaN(grade)) return res.status(400).send('Invalid grade');
  try {
    db.addGrade(id, course, grade);
    res.sendStatus(200);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});


app.get('/transcripts/:id/:course', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const course = req.params.course;
  if (Number.isNaN(id)) return res.status(400).send('Invalid id');
  try {
    const grade = db.getGrade(id, course);
    res.status(200).send({ studentID: id, course, grade });
  } catch (e: any) {
    res.status(404).send(e.message);
  }
});


app.get('/studentids', (req, res) => {
  const name = req.query.name as string;
  if (!name) return res.status(400).send('Missing "name" query parameter');
  const ids = db.getStudentIDs(name);
  res.status(200).send(ids);
});

app.delete('/transcripts/:id', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).send('Invalid id');
  try {
    db.deleteStudent(id);
    res.sendStatus(200);
  } catch (e: any) {
    res.status(404).send(e.message);
  }
});


app.use((_req, res) => res.sendStatus(404));

app.listen(inputPort, () => {
  console.log(`Express server now listening on localhost:${inputPort}`);
});
