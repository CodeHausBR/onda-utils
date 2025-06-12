import api from "./api";
import data from "./data";
import form from "./form";
import geral from "./geral";
import localStorage from "./localStorage";
import updateContext from "./updateContext";
import sessionStorage from "./sessionStorage";
import message from "./message";
import sistema from "./systema";

const utils = class utils {
    static api = api;

    static data = data;

    static form = form;

    static geral = geral;

    static localStorage = localStorage;

    static updateContext = updateContext;

    static sessionStorage = sessionStorage;

    static message = message;

    static sistema = sistema;
};

export default utils;
