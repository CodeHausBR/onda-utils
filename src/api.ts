import axios from "axios";
import t from "onda-types";
//HOOKS
import utils from "..";

//UTILS
const api = class api {
    static servidor_backend = class servidor_backend {
        static async post(BASE_URL: string, url: string, data: object, message: boolean = true) {
            try {
                const response = await axios.create({
                    baseURL: BASE_URL,
                }).post(url, data, api.headers());
                if (message === true) utils.message.api(response?.data);
                return response.data;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }

        static async get(BASE_URL: string, url: string, message: boolean, params: object = {}) {
            try {
                const queryParams = new URLSearchParams();

                Object.entries(params).forEach(([key, value]: [key: any, value: any]) => {
                    if (value !== null && value !== undefined) {
                        queryParams.append(key, value as string);
                    }
                });

                const queryString = queryParams.toString();
                const fullUrl = queryString ? `${url}?${queryString}` : url;

                const response = await axios.create({
                    baseURL: BASE_URL,
                }).get(fullUrl, api.headers());
                if (message === true) utils.message.api(response?.data);
                return response.data;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }

        static async patch(BASE_URL: string, url: string, data: object, message: boolean = true) {
            try {
                const response = await axios.create({
                    baseURL: BASE_URL,
                }).patch(url, data, api.headers());


                if (message === true) utils.message.api(response?.data);
                return response.data;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }

        static async delete(BASE_URL: string, url: string, config = {}, message = true) {
            try {
                const response = await axios.create({
                    baseURL: BASE_URL,
                }).delete(url, api.headers());
                if (message === true) utils.message.api(response?.data);
                return response.data;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }
    };

    static servidor_bucket = class servidor_bucket {


        static async post(BASE_URL: string, url: string, data: object, message: boolean) {
            try {
                const response = await axios.create({
                    baseURL: BASE_URL,
                }).post(url, data, api.headers({ content_type: "multipart/form-data" }));
                if (message === true) utils.message.api(response?.data);
                return response;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }

        static async get(BASE_URL: string, url: string, message = true) {
            try {
                const response = await axios.create({
                    baseURL: BASE_URL,
                }).get(url, api.headers({ content_type: "multipart/form-data" }));
                if (message === true) utils.message.api(response?.data);
                return response;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }

        static async put(BASE_URL: string, url: string, data: object, config = {}, message = true) {
            try {
                const response = await axios.create({
                    baseURL: BASE_URL,
                }).put(url, data, api.headers({ content_type: "multipart/form-data" }));
                if (message === true) utils.message.api(response?.data);
                return response;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }

        static async delete(BASE_URL: string, url: string, config = {}, message = true) {
            try {
                const response = await axios.create({
                    baseURL: BASE_URL,
                }).delete(url, config);
                if (message === true) utils.message.api(response?.data);
                return response;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }
    };



    static headers(params?: any) {
        params = params || {};
        const content_type = params?.content_type;

        const get_auth_user = utils.session_storage.get_item_session_storage("auth_user");
        const get_auth_user_local = utils.local_storage.getItemlocal_storage("auth_user");

        return {
            headers: {
                Authorization: `Bearer ${get_auth_user?.token || get_auth_user_local?.token}`,
                "Content-type": content_type || "application/json",
            },
        };
    }
    static usuario_auth(): t.Banco.Controllers.Usuario.AuthFront {
        const get_auth_user = utils.session_storage.get_item_session_storage("auth_user");

        return get_auth_user;
    }
};

export default api;
