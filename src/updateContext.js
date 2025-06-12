//BIBLIOTECAS

//HELPERS

//BANCO DE DADOS

//SERVICES

const updateContext = class updateContext {
    /**
     *
     * @deprecated
     */
    static updateArrayItens({ oldArray = [], newItem = [], key = "_id" }) {
        try {
            // Verifica se newItem é um array, se não for, converte para array
            const hasValidIds = Array.isArray(newItem) ? newItem.every((item) => item?._id) : newItem?._id;

            const newItemArray = hasValidIds ? (Array.isArray(newItem) ? newItem : [newItem]) : oldArray;

            if (oldArray?.length === 0) return newItemArray;

            // Cria cópias profundas dos arrays para não modificar os originais
            const updatedArray = JSON.parse(JSON.stringify(oldArray));

            // Itera sobre os novos itens
            newItemArray.forEach((novoItem) => {
                const index = updatedArray.findIndex((oldItem) => oldItem?.[key] === novoItem?.[key]);

                if (index !== -1) {
                    // Atualiza o item existente mantendo as propriedades antigas que não estão no novo item
                    novoItem.new = false;
                    updatedArray[index] = { ...updatedArray[index], ...novoItem };
                } else {
                    // Adiciona novo item no inicio com a propriedade new = true para adicionar efeito visual de novo item ou animação
                    novoItem.new = true;
                    updatedArray.unshift(novoItem);
                }
            });

            return updatedArray;
        } catch (error) {
            console.error("Erro as cadastrar novo item no contexto!");
        }
    }

    static set_new_item_end = ({ oldArray = [], newItem = [], key = "_id" }) => {
        try {
            const hasValidIds = Array.isArray(newItem) ? newItem.every((item) => item?.[key]) : newItem?.[key];
            const newItemArray = hasValidIds ? (Array.isArray(newItem) ? newItem : [newItem]) : oldArray;

            if (oldArray?.length === 0) return newItemArray;

            // Cria uma cópia rasa do array original
            const updatedArray = [...oldArray];

            // Itera sobre os novos itens
            newItemArray.forEach((novoItem) => {
                const index = updatedArray.findIndex((oldItem) => oldItem?.[key] === novoItem?.[key]);

                if (index !== -1) {
                    // Atualiza o item existente mantendo as propriedades antigas que não estão no novo item
                    novoItem.new = false;
                    updatedArray[index] = { ...updatedArray[index], ...novoItem };
                } else {
                    // Adiciona novo item no FINAL com a propriedade new = true
                    novoItem.new = true;
                    updatedArray.push(novoItem); // Usa push em vez de unshift
                }
            });

            return updatedArray;
        } catch (error) {
            console.error("Erro ao atualizar array:", error);
            return oldArray; // Retorna o array original em caso de erro
        }
    };

    static updateArrayItensNew = ({ oldArray = [], newItem = [], key = "_id" }) => {
        try {
            const hasValidIds = Array.isArray(newItem) ? newItem.every((item) => item?.[key]) : newItem?.[key];
            const newItemArray = hasValidIds ? (Array.isArray(newItem) ? newItem : [newItem]) : oldArray;

            if (oldArray?.length === 0) return newItemArray;

            // Cria uma cópia rasa do array original
            const updatedArray = [...oldArray];

            // Itera sobre os novos itens
            newItemArray.forEach((novoItem) => {
                const index = updatedArray.findIndex((oldItem) => oldItem?.[key] === novoItem?.[key]);

                if (index !== -1) {
                    // Atualiza o item existente mantendo as propriedades antigas que não estão no novo item
                    novoItem.new = false;
                    updatedArray[index] = { ...updatedArray[index], ...novoItem };
                } else {
                    // Adiciona novo item no início com a propriedade new = true
                    novoItem.new = true;
                    updatedArray.unshift(novoItem);
                }
            });

            return updatedArray;
        } catch (error) {
            console.error("Erro ao atualizar array:", error);
            return oldArray; // Retorna o array original em caso de erro
        }
    };

    /**
     *
     * @deprecated
     */
    static removeArrayItem({ oldArray = [], itemToRemove = [], key = "_id" }) {
        try {
            // Verifica se itemToRemove é um array, se não for, converte para array
            const hasValidIds = Array.isArray(itemToRemove) ? itemToRemove.every((item) => item?.[key]) : itemToRemove?.[key];

            const itemToRemoveArray = hasValidIds ? (Array.isArray(itemToRemove) ? itemToRemove : [itemToRemove]) : [];

            // Se o array original estiver vazio ou nenhum item para remover, retorna o array original
            if (oldArray?.length === 0 || itemToRemoveArray.length === 0) return oldArray;

            // Cria cópia profunda do array para não modificar o original
            const updatedArray = JSON.parse(JSON.stringify(oldArray));

            // Filtra o array removendo os itens especificados
            return updatedArray.filter((oldItem) => !itemToRemoveArray.some((itemToDelete) => oldItem?.[key] === itemToDelete?.[key]));
        } catch (error) {
            console.error("Erro ao remover item do array!");
            return oldArray;
        }
    }

    static removeArrayItemsNew = ({ oldArray = [], itemsToRemove = [], key = "_id" }) => {
        try {
            // Verifica se os argumentos são válidos
            if (!Array.isArray(oldArray) || oldArray.length === 0) return oldArray;
            if (!itemsToRemove) return oldArray;

            // Converte itemsToRemove para array se for um único item
            const itemsArray = Array.isArray(itemsToRemove) ? itemsToRemove : [itemsToRemove];

            // Se não houver itens para remover, retorna o array original
            if (itemsArray.length === 0) return oldArray;

            // Cria um Set com os IDs dos itens a serem removidos para busca mais eficiente
            const removeIds = new Set(itemsArray.filter((item) => item?.[key]).map((item) => item[key]));

            // Filtra o array original removendo os itens cujos IDs estão no Set
            const updatedArray = oldArray.filter((item) => !removeIds.has(item?.[key]));

            return updatedArray;
        } catch (error) {
            console.error("Erro ao remover itens do array:", error);
            return oldArray; // Retorna o array original em caso de erro
        }
    };

    static compareArrays({ arrayAntigo, arrayNovo }) {
        // Cria Sets para performance
        const idsAntigos = new Set(arrayAntigo.map((item) => item._id));
        const idsNovos = new Set(arrayNovo.map((item) => item._id));

        // Mantém apenas os itens do array antigo que ainda existem no novo
        const itensMantidos = arrayAntigo.filter((item) => idsNovos.has(item._id));

        // Adiciona os itens novos que não existiam no array antigo
        const itensNovos = arrayNovo.filter((item) => !idsAntigos.has(item._id));

        // Combina os arrays
        return [...itensMantidos, ...itensNovos];
    }
};

export default updateContext;
