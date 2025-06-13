import api from "./src/api.ts"
import data from "./src/data.js";
import form from "./src/form.ts";
import geral from "./src/geral.ts";
import local_storage from "./src/local_storage.ts";
import update_context from "./src/update_context.ts";
import session_storage from "./src/session_storage.js";
import message from "./src/message.tsx";
import sistema from "./src/systema.js";

const utils = class utils {
    static api = api;

    static data = data;

    static form = form;

    static geral = geral;

    static local_storage = local_storage;

    static update_context = update_context;

    static session_storage = session_storage;

    static message = message;

    static sistema = sistema;
};

export default utils;
