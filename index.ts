import api from "./src/api"
import data from "./src/data";
import form from "./src/form";
import geral from "./src/geral";
import local_storage from "./src/local_storage";
import update_context from "./src/update_context";
import session_storage from "./src/session_storage";
import message from "./src/message";
import sistema from "./src/systema";
import controller from "./src/controller";

const utils = class utils {
    static api = api;

    static controller = controller;

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
