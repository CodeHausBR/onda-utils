const session_storage = class session_storage {
    static adicionar_item_session_storage(chave: any, novoItem: any) {
        try {
            const valorAtual = window.sessionStorage.getItem(chave);
            const listaAtual = valorAtual ? JSON.parse(valorAtual) : [];

            const newDataItem = {
                ...listaAtual,
                ...novoItem,
            };
            window.sessionStorage.setItem(chave, JSON.stringify(newDataItem));
        } catch (error) {
            console.error(error);
        }
    }

    static set_session_storage_sem_incremento(chave: any, novoItem: any) {
        try {
            window.sessionStorage.setItem(chave, JSON.stringify(novoItem));
        } catch (error) {
            console.error(error);
        }
    }

    static get_item_session_storage(chave: any) {
        try {
            if (typeof window !== "undefined") {
                const valorAtual = window.sessionStorage.getItem(chave);
                return valorAtual ? JSON.parse(valorAtual) : valorAtual;
            }
            return;
        } catch (error) {
            console.error(error);
        }
    }

    static remover_item_session_storage(chave: any) {
        try {
            window.sessionStorage.removeItem(chave);
        } catch (error) {
            console.error(error);
        }
    }
};

export default session_storage;
