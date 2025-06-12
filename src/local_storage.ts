const local_storage = class local_storage {
    static adicionarItemlocal_storage(chave: string, novoItem: any) {
        try {
            const valorAtual = window.localStorage.getItem(chave);
            const listaAtual = valorAtual ? JSON.parse(valorAtual) : [];

            const newDataItem = {
                ...listaAtual,
                ...novoItem,
            };
            window.localStorage.setItem(chave, JSON.stringify(newDataItem));
        } catch (error) { }
    }

    static setlocal_storageSemIncremento(chave: string, novoItem: any) {
        try {
            window.localStorage.setItem(chave, JSON.stringify(novoItem));
        } catch (error) { }
    }

    static getItemlocal_storage(chave: string) {
        try {
            if (typeof window !== "undefined") {
                const valorAtual = window.localStorage.getItem(chave);
                return valorAtual ? JSON.parse(valorAtual) : valorAtual;
            }
            return;
        } catch (error) { }
    }

    static removerItemlocal_storage(chave: string) {
        try {
            window.localStorage.removeItem(chave);
        } catch (error) { }
    }
};


export default local_storage;
