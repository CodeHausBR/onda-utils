const sessionStorage = class sessionStorage {
    static adicionarItemSessionStorage(chave, novoItem) {
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

    static setSessionStorageSemIncremento(chave, novoItem) {
        try {
            window.sessionStorage.setItem(chave, JSON.stringify(novoItem));
        } catch (error) {
            console.error(error);
        }
    }

    static getItemSessionStorage(chave) {
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

    static removerItemSessionStorage(chave) {
        try {
            window.sessionStorage.removeItem(chave);
        } catch (error) {
            console.error(error);
        }
    }
};

// Para usar a classe, você pode fazer:
export default sessionStorage;
