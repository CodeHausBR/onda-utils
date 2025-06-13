const data = class data {
    static YYYY_MM_DD_00_00_00(newData: string) {
        let dataAtual = new Date();
        if (newData) {
            dataAtual = new Date(newData);
        }

        const options = {
            timeZone: "America/Sao_Paulo",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        const horarioFormatado = dataAtual.toLocaleString("pt-BR", options);
        const [data, hora] = horarioFormatado.split(" " && ",");
        const [dia, mes, ano] = data.split("/");
        return `${ano}-${mes}-${dia} ${hora}`;
    }

    static DD_MM_YYYY_00_00_00(newData: string) {
        let dataAtual = new Date();
        if (newData) {
            dataAtual = new Date(newData);
        }

        const options = {
            timeZone: "America/Sao_Paulo",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return dataAtual.toLocaleString("pt-BR", options);
    }

    static DD_MM_YYYY_00_00(newData: string) {
        let dataAtual = new Date();
        if (newData) {
            dataAtual = new Date(newData);
        }

        const options = {
            timeZone: "America/Sao_Paulo",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        const dataFormatada = dataAtual.toLocaleString("pt-BR", options).replace(",", "");
        return dataFormatada;
    }

    static DD_MM_YYYY(newData: string) {
        let dataAtual = new Date();
        if (newData) {
            dataAtual = new Date(newData);
        }

        const options = {
            timeZone: "America/Sao_Paulo",
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };
        return dataAtual.toLocaleString("pt-BR", options);
    }

    static YYYY_MM_DD(newData: string) {
        let dataAtual = new Date();
        if (newData) {
            dataAtual = new Date(newData);
        }

        const options = {
            timeZone: "America/Sao_Paulo",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        const horarioFormatado = dataAtual.toLocaleString("pt-BR", options);
        const [data] = horarioFormatado.split(" " && ",");
        const [dia, mes, ano] = data.split("/");
        return `${ano}-${mes}-${dia}`;
    }

    static DIFERENCA_SEGUNDOS(data: string) {
        var dataInicial = new Date(data);
        var dataAtual = new Date();
        var diferenca = dataAtual - dataInicial;
        var diferencaEmSegundos = Math.floor(diferenca / 1000);
        return diferencaEmSegundos;
    }
    static DIFERENCA_DIAS(data: string) {
        var dataInicial = new Date(data);
        var dataAtual = new Date();
        var diferenca = dataAtual.getTime() - dataInicial.getTime(); // Obtém a diferença em milissegundos
        var diferencaEmDias = Math.floor(diferenca / (1000 * 60 * 60 * 24)); // Calcula a diferença em dias
        return diferencaEmDias;
    }
};

export default data;
