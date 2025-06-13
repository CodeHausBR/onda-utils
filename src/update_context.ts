//BIBLIOTECAS

//HELPERS

//BANCO DE DADOS

//SERVICES

const update_context = class update_context {


    static set_new_item_end = ({ oldArray = [] as any, newItem = [] as any, key = "_id" as string }) => {
        try {
            const hasValidIds = Array.isArray(newItem) ? newItem.every((item) => item?.[key]) : newItem?.[key];
            const newItemArray = hasValidIds ? (Array.isArray(newItem) ? newItem : [newItem]) : oldArray;

            if (oldArray?.length === 0) return newItemArray;

            // Cria uma cópia rasa do array original
            const updatedArray: any = [...oldArray];

            // Itera sobre os novos itens
            newItemArray.forEach((novoItem: any) => {
                const index = updatedArray.findIndex((oldItem: any) => oldItem?.[key] === novoItem?.[key]);


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

    static update_array_itens = ({ oldArray = [] as any, newItem = [] as any, key = "_id" as string }) => {
        try {
            const hasValidIds = Array.isArray(newItem) ? newItem.every((item) => item?.[key]) : newItem?.[key];
            const newItemArray = hasValidIds ? (Array.isArray(newItem) ? newItem : [newItem]) : oldArray;

            if (oldArray?.length === 0) return newItemArray;

            // Cria uma cópia rasa do array original
            const updatedArray: any = [...oldArray];

            // Itera sobre os novos itens
            newItemArray.forEach((novoItem: any) => {
                const index = updatedArray.findIndex((oldItem: any) => oldItem?.[key] === novoItem?.[key]);

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

            return oldArray; // Retorna o array original em caso de erro
        }
    };


    static remove_array_items = ({ oldArray = [] as any, itemsToRemove = [] as any, key = "_id" as string, }) => {
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

    static comparar_arrays({ arrayAntigo, arrayNovo }: { arrayAntigo: any; arrayNovo: any; }) {
        // Cria Sets para performance
        const idsAntigos = new Set(arrayAntigo.map((item: any) => item._id));
        const idsNovos = new Set(arrayNovo.map((item: any) => item._id));

        // Mantém apenas os itens do array antigo que ainda existem no novo
        const itensMantidos = arrayAntigo.filter((item: any) => idsNovos.has(item._id));

        // Adiciona os itens novos que não existiam no array antigo
        const itensNovos = arrayNovo.filter((item: any) => !idsAntigos.has(item._id));

        // Combina os arrays
        return [...itensMantidos, ...itensNovos];
    }

    static remover_item_pelo_id({ oldArray, itemToRemove, key = "_id" }: { oldArray: any[]; itemToRemove: any[]; key: string }) {
        try {
            // Se o array original estiver vazio ou nenhum item para remover, retorna o array original
            if (!oldArray?.length || !itemToRemove) return oldArray;

            // Converte itemToRemove para array de IDs se necessário
            const idsToRemove = Array.isArray(itemToRemove)
                ? itemToRemove.map((item) => (typeof item === "object" ? item[key] : item))
                : [typeof itemToRemove === "object" ? itemToRemove[key] : itemToRemove];

            // Remove valores undefined/null do array de IDs
            const validIdsToRemove = idsToRemove.filter((id) => id != null);

            // Se não há IDs válidos para remover, retorna o array original
            if (validIdsToRemove.length === 0) return oldArray;

            // Cria cópia profunda do array para não modificar o original
            const updatedArray = JSON.parse(JSON.stringify(oldArray));

            // Filtra o array removendo os itens com os IDs especificados
            const filteredArray = updatedArray.filter((item: any) => !validIdsToRemove.includes(item?.[key]));

            return filteredArray;
        } catch (error) {
            console.error("Erro ao remover item do array!", error);
            return oldArray;
        }
    }
};

export default update_context;
