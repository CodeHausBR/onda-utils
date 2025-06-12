import api from "./api";
import data from "./data";
import form from "./form";
import geral from "./geral";
import local_storage from "./local_storage";
import update_context from "./update_context";
import session_storage from "./session_storage";
import message from "./message";
import sistema from "./systema";

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
