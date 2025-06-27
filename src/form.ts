class form {
    static regexCpfCnpj(value: string) {
        if (typeof value !== "string") return ""
        let tempValue = value.replace(/\D/g, "");

        if (tempValue.length > 14) {
            tempValue = tempValue.slice(0, 14);
        }

        if (tempValue.length <= 11) {
            tempValue = tempValue.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/, (match, p1, p2, p3, p4) => {
                let result = p1;
                if (p2) result += "." + p2;
                if (p3) result += "." + p3;
                if (p4) result += "-" + p4;
                return result;
            });
        } else {
            tempValue = tempValue.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/, (match, p1, p2, p3, p4, p5) => {
                let result = p1;
                if (p2) result += "." + p2;
                if (p3) result += "." + p3;
                if (p4) result += "/" + p4;
                if (p5) result += "-" + p5;
                return result;
            });
        }

        return tempValue;
    }

    static formatCPF(value: string) {
        if (typeof value !== "string") return ""
        const cpf_cnpj = value.replace(/\D/g, "");
        if (cpf_cnpj.length > 11) {
            return cpf_cnpj.slice(0, 11);
        }
        return cpf_cnpj.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/, (match, p1, p2, p3, p4) => {
            let result = p1;
            if (p2) result += "." + p2;
            if (p3) result += "." + p3;
            if (p4) result += "-" + p4;
            return result;
        });
    }

    static formatCNPJ(value: string) {
        if (typeof value !== "string") return ""
        const cnpj = value.replace(/\D/g, "");
        if (cnpj.length > 14) {
            return cnpj.slice(0, 14);
        }
        return cnpj.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/, (match, p1, p2, p3, p4, p5) => {
            let result = p1;
            if (p2) result += "." + p2;
            if (p3) result += "." + p3;
            if (p4) result += "/" + p4;
            if (p5) result += "-" + p5;
            return result;
        });
    }

    static formatar_cpf_cnpj(value: string): string {
        if (typeof value !== "string") return ""
        const cleanValue = value.replace(/\D/g, "");

        if (cleanValue.length <= 11) {
            return form.formatCPF(value);
        } else {
            return form.formatCNPJ(value);
        }
    }

    static retirar_caracteres_especiais(value: string): string {
        return value.replace(/\D/g, "");
    }


    static formatar_cep(value: string) {
        if (typeof value !== "string") return ""

        const cep = value.replace(/\D/g, "");

        if (cep.length > 8) {
            return cep.slice(0, 8);
        }
        return cep.replace(/^(\d{0,5})(\d{0,3})$/, (match, p1, p2) => {
            if (p2) return `${p1}-${p2}`;
            return p1;
        });
    }

    static formatar_telefone_fixo(value: string) {
        if (typeof value !== "string") return ""

        const telefone = value.replace(/\D/g, "");

        if (telefone.length > 10) {
            return telefone.slice(0, 10);
        }
        return telefone.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})$/, (match, p1, p2, p3) => {
            let result = "";
            if (p1) result += `(${p1}`;
            if (p2) result += `) ${p2}`;
            if (p3) result += `-${p3}`;
            return result;
        });
    }

    static formatar_celular(value: string) {
        if (typeof value !== "string") return ""

        const celular = value.replace(/\D/g, "");

        if (celular.length > 11) {
            return celular.slice(0, 11);
        }
        return celular.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})$/, (match, p1, p2, p3) => {
            let result = "";
            if (p1) result += `(${p1}`;
            if (p2) result += `) ${p2}`;
            if (p3) result += `-${p3}`;
            return result;
        });
    }

    static formatar_nomes(name: string) {
        if (typeof name !== "string") return ""
        if (!name) return ""

        const lowercaseWords = ["de", "da", "do", "das", "dos", "e", "a", "o"];
        const words = name.toLowerCase().split(" ");

        const formattedWords = words.map((word, index) => {
            if (index === 0) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            if (lowercaseWords.includes(word)) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        });

        return formattedWords.join(" ");
    }

    static formatar_reais(value: string) {
        if (typeof value !== "string") return ""
        let num = value.replace(/\D/g, "");
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        }).format(Number(num) / 100);
    }
}

export default form;
