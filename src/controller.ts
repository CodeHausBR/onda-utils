import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import utils from "..";

type Env = "producao" | "desenvolvimento";

const PUBLIC_NODE_ENV: Env = process.env.PUBLIC_NODE_ENV as Env;

type Servidores = "wave" | "worker_financeiro" | "portal" | "banco";

interface EntityState {
    modal: {
        item: any;
        loading: boolean;
        open: boolean;
    };
    pagina: {
        loading: boolean;
        itens: any[];
        paginacao: {
            total_itens: number;
            total_paginas: number;
            total_itens_pagina_atual: number;
            itens_por_pagina: number;
        };
    };
    pagina_mini_select: {
        loading: boolean;
        itens: any[];
        item_selecionado: any;
        paginacao: {
            total_itens: number;
            total_paginas: number;
            total_itens_pagina_atual: number;
            itens_por_pagina: number;
        };
    };
    formulario: {
        open: boolean;
        criar: any;
        atualizar: any;
        progress: number;
        loading: boolean;
        loading_submit: boolean;
    };
}

interface ZustandStore {
    states: {
        [entidade: string]: EntityState;
    };
}

export interface ControllerActions {
    Criar: {Input: any; Output: any};
    BuscarPeloFiltro: {Input: any; Output: any};
    BuscarPeloId: {Input: any; Output: any};
    AtualizarPeloId: {Input: any; Output: any};
    DeletarPeloId: {Input: {data: {_id: string}}; Output: any};
    states: EntityState;
}

const criar_entidade_virtual = (): EntityState => ({
    modal: {
        loading: false,
        item: {} as any,
        open: false,
    },
    pagina: {
        itens: [],
        loading: false,
        paginacao: {
            total_itens: 0,
            total_paginas: 10,
            total_itens_pagina_atual: 0,
            itens_por_pagina: 0,
        },
    },
    pagina_mini_select: {
        loading: false,
        itens: [] as any,
        item_selecionado: {} as any,
        paginacao: {
            total_itens: 0,
            total_paginas: 10,
            total_itens_pagina_atual: 0,
            itens_por_pagina: 0,
        },
    },
    formulario: {
        criar: {} as any,
        atualizar: {} as any,
        open: false,
        loading: false,
        loading_submit: false,
        progress: 0,
    },
});

const store = create<ZustandStore>()(
    immer((set) => ({
        states: {},
    }))
);

interface ControllerProps {
    entidade: string;
    servidor: Servidores;
}

class controller<TController extends ControllerActions, TEntidade extends string = string> {
    private entidade: TEntidade;
    private servidor: Servidores;

    public constructor({entidade, servidor}: ControllerProps) {
        this.entidade = entidade as TEntidade;
        this.servidor = servidor as Servidores;

        const currentState = store.getState();
        if (!currentState.states[this.entidade]) {
            store.setState((state) => {
                state.states[this.entidade] = criar_entidade_virtual();
            });
        }
    }

    private acessar_servidor() {
        if (PUBLIC_NODE_ENV?.toLowerCase() === "producao") {
            //PRODUCAO
            const servidor = {
                wave: "https://api-wave.ondasegura.com.br",
                worker_financeiro: "https://api.codehaus.app/financeiro",
                portal: "https://api-portal.ondasegura.com.br",
                banco: "https://api-banco.ondasegura.com.br",
            };

            return servidor[this.servidor];
        } else {
            //SANDBOX
            const servidor = {
                wave: "https://api-sandbox-wave.ondasegura.com.br",
                worker_financeiro: "https://api-sandbox.codehaus.app/financeiro",
                portal: "https://api-sandbox-portal.ondasegura.com.br",
                banco: "https://api-sandbox-banco.ondasegura.com.br",
            };

            return servidor[this.servidor];
        }
    }

    public api = {
        criar: async (props: TController["Criar"]["Input"]) => {
            try {
                this.set_state((state_entidade) => {
                    state_entidade.formulario.loading = true;
                });

                const data: TController["Criar"]["Output"] = await utils.api.servidor_backend.post(this.acessar_servidor(), this.entidade, props, true);

                const newItem = (data as any)?.results?.data?.[this.entidade];

                if (newItem) {
                    this.set_state((state_entidade) => {
                        state_entidade.pagina = {
                            itens: utils.update_context.update_array_itens({oldArray: state_entidade.pagina.itens, newItem: newItem}),
                            loading: false,
                            paginacao: {
                                itens_por_pagina: state_entidade.pagina.paginacao.itens_por_pagina + 1,
                                total_itens: state_entidade.pagina.paginacao.total_itens + 1,
                                total_itens_pagina_atual: state_entidade.pagina.paginacao.total_itens_pagina_atual + 1,
                                total_paginas: state_entidade.pagina.paginacao.total_paginas,
                            },
                        };
                        state_entidade.pagina_mini_select = {
                            item_selecionado: newItem,
                            itens: utils.update_context.update_array_itens({oldArray: state_entidade.pagina.itens, newItem: newItem}),
                            loading: false,
                            paginacao: {
                                itens_por_pagina: state_entidade.pagina.paginacao.itens_por_pagina + 1,
                                total_itens: state_entidade.pagina.paginacao.total_itens + 1,
                                total_itens_pagina_atual: state_entidade.pagina.paginacao.total_itens_pagina_atual + 1,
                                total_paginas: state_entidade.pagina.paginacao.total_paginas,
                            },
                        };
                    });
                }
            } finally {
                if (this.get_state.pagina.loading !== true)
                    this.set_state((state_entidade) => {
                        state_entidade.pagina.loading = false;
                    });
            }
        },

        buscar_pelo_filtro: async (props: TController["BuscarPeloFiltro"]["Input"]) => {
            this.set_state((state_entidade) => {
                state_entidade.pagina.loading = true;
                state_entidade.pagina_mini_select.loading = true;
            });

            try {
                const data: TController["BuscarPeloFiltro"]["Output"] = await utils.api.servidor_backend.get(
                    this.acessar_servidor(),
                    this.entidade,
                    true,
                    (props as any)?.filtros?.[this.entidade] || {}
                );
                const results: TController["BuscarPeloFiltro"]["Output"] = (data as any)?.results?.data;

                if (results?.[this.entidade]) {
                    this.set_state((state_entidade) => {
                        //PAGINA
                        state_entidade.pagina = {
                            paginacao: results?.paginacao,
                            itens: results?.[this.entidade] || [],
                            loading: false,
                        };
                        //PAGINA MINI
                        state_entidade.pagina_mini_select = {
                            paginacao: results?.paginacao,
                            itens: results?.[this.entidade] || [],
                            loading: false,
                            item_selecionado: {},
                        };
                    });
                }
            } finally {
                this.set_state((state_entidade) => {
                    state_entidade.pagina.loading = false;
                    state_entidade.pagina_mini_select.loading = false;
                });
            }
        },

        buscar_pelo_id: async (props: TController["BuscarPeloId"]["Input"]) => {
            try {
                this.set_state((state_entidade) => {
                    state_entidade.formulario.loading = true;
                    state_entidade.modal.loading = true;
                });

                const data: TController["BuscarPeloId"]["Output"] = await utils.api.servidor_backend.get(
                    this.acessar_servidor(),
                    `${this.entidade}/${(props as any).data._id}`,
                    true,
                    {}
                );
                const item = (data as any)?.results?.data?.[this.entidade];

                if (item) {
                    this.set_state((state_entidade) => {
                        state_entidade.modal.item = item;
                        state_entidade.formulario.atualizar = item;
                    });
                }
            } finally {
                this.set_state((state_entidade) => {
                    state_entidade.formulario.loading = false;
                    state_entidade.modal.loading = false;
                });
            }
        },

        atualizar_pelo_id: async (props: TController["AtualizarPeloId"]["Input"]) => {
            try {
                this.set_state((state_entidade) => {
                    state_entidade.formulario.loading = true;
                    state_entidade.modal.loading = true;
                });

                const id = (props as any).data[this.entidade]._id;
                const data: TController["AtualizarPeloId"]["Output"] = await utils.api.servidor_backend.patch(
                    this.acessar_servidor(),
                    `${this.entidade}/${id}`,
                    {data: (props as any).data},
                    true
                );
                const updatedItem = (data as any)?.results?.data?.[this.entidade];

                if (updatedItem) {
                    const update_itens = utils.update_context.update_array_itens({
                        oldArray: this.get_state.pagina.itens,
                        newItem: updatedItem,
                    });
                    this.set_state((state_entidade) => {
                        state_entidade.pagina.itens = update_itens;
                    });
                }
            } finally {
                this.set_state((state_entidade) => {
                    state_entidade.formulario.loading = false;
                    state_entidade.modal.loading = false;
                });
            }
        },

        deletar_pelo_id: async (props: TController["DeletarPeloId"]["Input"]) => {
            try {
                this.set_state((state_entidade) => {
                    state_entidade.modal.loading = true;
                });

                await utils.api.servidor_backend.delete(this.acessar_servidor(), `${this.entidade}/${props.data._id}`);

                const update_itens = utils.update_context.remover_item_pelo_id({
                    oldArray: this.get_state.pagina.itens as [],
                    itemToRemove: {_id: props.data._id},
                });

                this.set_state((state_entidade) => {
                    state_entidade.pagina = {
                        itens: update_itens,
                        loading: false,
                        paginacao: {
                            itens_por_pagina: state_entidade.pagina.paginacao.itens_por_pagina - 1,
                            total_itens: state_entidade.pagina.paginacao.total_itens - 1,
                            total_itens_pagina_atual: state_entidade.pagina.paginacao.total_itens_pagina_atual - 1,
                            total_paginas: state_entidade.pagina.paginacao.total_paginas,
                        },
                    };
                });
            } finally {
                this.set_state((state_entidade) => {
                    state_entidade.modal.loading = false;
                });
            }
        },
    };

    public get get_jsx(): TController["states"] {
        return store().states[this.entidade] || criar_entidade_virtual();
    }

    public get get_state(): TController["states"] {
        return store.getState().states[this.entidade] || criar_entidade_virtual();
    }

    public set_state = (updater: (state_entidade: EntityState) => void) => {
        store.setState((state) => {
            if (!state.states[this.entidade]) {
                state.states[this.entidade] = criar_entidade_virtual();
            }
            updater(state.states[this.entidade]);
        });
    };
}

export default controller;
