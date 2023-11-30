import { action } from "easy-peasy";

const NotesModel = {
  notes: [],
  addNote: action((state, payload) => {
    state.notes.push(payload);
  }),
};

export default NotesModel;
