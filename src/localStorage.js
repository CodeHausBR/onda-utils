const localStorage = class localStorage {
    static adicionarItemLocalStorage(chave, novoItem) {
        try {
            const valorAtual = window.localStorage.getItem(chave);
            const listaAtual = valorAtual ? JSON.parse(valorAtual) : [];

            const newDataItem = {
                ...listaAtual,
                ...novoItem,
            };
            window.localStorage.setItem(chave, JSON.stringify(newDataItem));
        } catch (error) {}
    }

    static setLocalStorageSemIncremento(chave, novoItem) {
        try {
            window.localStorage.setItem(chave, JSON.stringify(novoItem));
        } catch (error) {}
    }

    static getItemLocalStorage(chave) {
        try {
            if (typeof window !== "undefined") {
                const valorAtual = window.localStorage.getItem(chave);
                return valorAtual ? JSON.parse(valorAtual) : valorAtual;
            }
            return;
        } catch (error) {}
    }

    static removerItemLocalStorage(chave) {
        try {
            window.localStorage.removeItem(chave);
        } catch (error) {}
    }
};

// Para usar a classe, você pode fazer:
export default localStorage;
