

type OutputArray = { _id: string; value: string; }

const geral = class geral {
    static sliceFileName(filename: string, maxLength: number = 30): string {
        if (!filename || typeof filename !== "string") return "";

        // Encontra a última ocorrência do ponto para identificar a extensão
        const lastDotIndex = filename.lastIndexOf(".");

        // Se não houver extensão, trunca diretamente
        if (lastDotIndex === -1) {
            return filename.length > maxLength ? filename.substring(0, maxLength - 3) + "..." : filename;
        }

        const name = filename.substring(0, lastDotIndex);
        const extension = filename.substring(lastDotIndex);

        // Se o nome + extensão é menor que o máximo, retorna completo
        if (filename.length <= maxLength) return filename;

        // Calcula quanto espaço temos para o nome
        // Considerando: extensão + '...' + 1 caractere do nome
        const availableLength = maxLength - extension.length - 3;

        if (availableLength <= 0) {
            // Se não há espaço suficiente nem para 1 caractere do nome
            return name.substring(0, 1) + "..." + extension;
        }

        // Trunca o nome e mantém a extensão
        return name.substring(0, availableLength) + "..." + extension;
    }

    static extrair_id(array_enviado: Array<{ _id?: string }>): string[] {
        const ids: string[] = [];
        for (let i = 0; i < array_enviado.length; i++) {
            if (array_enviado[i]?._id) ids.push(array_enviado[i]._id!);
        }
        return ids;
    }

    static gerar_id = (length: number = 32) => {
        // Caracteres permitidos (apenas alfanuméricos)
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        // Timestamp em formato hexadecimal (sem separadores)
        const timestamp = Date.now().toString(16) + performance.now().toString(16).replace(".", "");

        // Inicializa resultado com timestamp para garantir unicidade temporal
        let result = timestamp;

        // Adiciona caracteres aleatórios até atingir o comprimento desejado
        while (result.length < length) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }

        // Combina com características do navegador para aumentar a unicidade
        const navigatorData = (window.navigator.userAgent + screen.width + screen.height)
            .split("")
            .map((c) => c.charCodeAt(0))
            .reduce((a, b) => a + b, 0)
            .toString(36);

        // Combina os dados e corta para o tamanho correto
        const finalResult = (result + navigatorData).replace(/[^a-zA-Z0-9]/g, "");

        // Garante o comprimento exato
        return finalResult.substring(0, length);
    };

    static formatar_array_objetos_para_array_de_id_value(input: object[], output: OutputArray | any): OutputArray[] {
        // Verifica se o input é um array
        if (!Array.isArray(input)) {
            throw new Error('Input deve ser um array');
        }

        // Verifica se o output é um objeto
        if (typeof output !== 'object' || output === null) {
            throw new Error('Output deve ser um objeto');
        }

        // Extrai as chaves do objeto output
        const outputKeys = Object.keys(output);

        // Mapeia o array de entrada
        const dados = input.map((item: any) => {
            const newItem: Record<string, any> = {};

            // Para cada chave no objeto output
            outputKeys.forEach(newKey => {
                const originalKey: any = output[newKey];

                // Verifica se a chave original existe no item
                if (item.hasOwnProperty(originalKey)) {
                    newItem[newKey] = item[originalKey];
                } else {
                    // Se a chave não existir, define como undefined
                    newItem[newKey] = undefined;
                }
            });

            return newItem;
        });

        return dados as OutputArray[]
    }
};

export default geral;
