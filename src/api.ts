import axios from "axios";
import t from "onda-types";
//HOOKS
import utils from ".";

//UTILS

const PUBLIC_BASE_URL_BACKEND = process.env.PUBLIC_BASE_URL_BACKEND;
const PUBLIC_BASE_URL_BUCKET = process.env.PUBLIC_BASE_URL_BUCKET;

const api = class api {
    static servidor_backend = class servidor_backend {
        static axios = axios.create({
            baseURL: PUBLIC_BASE_URL_BACKEND,
        });

        static async post(url: string, data: object, message: boolean = true) {
            try {
                const response = await this.axios.post(url, data, api.headers());
                if (message === true) utils.message.api(response?.data);
                return response.data;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }

        static async get(url: string, message: boolean, params: object = {}) {
            try {
                const queryParams = new URLSearchParams();

                Object().entries(params).forEach(([key, value]: [key: any, value: any]) => {
                    if (value !== null && value !== undefined) {
                        queryParams.append(key, value as string);
                    }
                });

                const queryString = queryParams.toString();
                const fullUrl = queryString ? `${url}?${queryString}` : url;

                const response = await this.axios.get(fullUrl, api.headers());
                if (message === true) utils.message.api(response?.data);
                return response.data;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }

        static async patch(url: string, data: object, message: boolean = true) {
            try {
                const response = await this.axios.patch(url, data, api.headers());


                if (message === true) utils.message.api(response?.data);
                return response.data;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }

        static async delete(url: string, config = {}, message = true) {
            try {
                const response = await this.axios.delete(url, api.headers());
                if (message === true) utils.message.api(response?.data);
                return response.data;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }
    };

    static servidor_bucket = class servidor_bucket {
        static axios = axios.create({
            baseURL: PUBLIC_BASE_URL_BUCKET,
        });

        static async post(url: string, data: object, message: boolean) {
            try {
                const response = await this.axios.post(url, data, api.headers({ content_type: "multipart/form-data" }));
                if (message === true) utils.message.api(response?.data);
                return response;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }

        static async get(url: string, message = true) {
            try {
                const response = await this.axios.get(url, api.headers({ content_type: "multipart/form-data" }));
                if (message === true) utils.message.api(response?.data);
                return response;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }

        static async put(url: string, data: object, config = {}, message = true) {
            try {
                const response = await this.axios.put(url, data, api.headers({ content_type: "multipart/form-data" }));
                if (message === true) utils.message.api(response?.data);
                return response;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }

        static async delete(url: string, config = {}, message = true) {
            try {
                const response = await this.axios.delete(url, config);
                if (message === true) utils.message.api(response?.data);
                return response;
            } catch (error: any) {
                utils.message.api(error?.response?.data);
            }
        }
    };

    static servidorBackend() {
        return axios.create({
            baseURL: PUBLIC_BASE_URL_BACKEND,
        });
    }

    static headers(params?: any) {
        params = params || {};
        const content_type = params?.content_type;

        const get_auth_user = utils.sessionStorage.getItemSessionStorage("auth_user");

        return {
            headers: {
                Authorization: `Bearer ${get_auth_user?.token}`,
                "Content-type": content_type || "application/json",
            },
        };
    }
    static usuario_auth(): t.Banco.Controllers.Usuario.AuthFront {
        const get_auth_user = utils.sessionStorage.getItemSessionStorage("auth_user");

        return get_auth_user;
    }
};

export default api;
