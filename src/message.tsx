import React, { useEffect } from "react";
import { create } from "zustand";
import { X } from "lucide-react";

// Enum para os tipos de mensagens
export type MessageType = "success" | "error" | "warning" | "info";

export interface MessageNotification {
    id: string;
    type: MessageType;
    message: string;
    autoHideDuration?: number;
}

export interface ContextoPadrao<T> {
    data: T;
    loading: boolean;
}

export interface MessageStoreState {
    states: {
        notificacoes: ContextoPadrao<MessageNotification[]>;
    };
}

export interface MessageApiParams {
    type: MessageType;
    message: string;
    id?: string;
    autoHideDuration?: number;
}

const store = create<MessageStoreState>(() => ({
    states: {
        notificacoes: {
            data: [],
            loading: false,
        },
    },
}));

const message = class message {
    static api(params: MessageApiParams): void {
        const notificacao: MessageNotification = {
            id: params?.id || Date.now().toString(),
            type: params?.type || "error",
            message: params?.message || "Erro ao processar",
            autoHideDuration: params?.autoHideDuration || 2500,
        };

        message.contexto.state.set_notificacoes([notificacao]);
    }

    static contexto = class contexto {
        static jsx = class jsx {
            static get_notificacoes(): ContextoPadrao<MessageNotification[]> {
                return store((state: any) => state.states.notificacoes);
            }
        };

        static state = class state {
            static set_notificacoes(notificacoesData: MessageNotification[] = []): void {
                store.setState((state: any) => ({
                    states: {
                        ...state.states,
                        notificacoes: {
                            ...state.states.notificacoes,
                            data: notificacoesData,
                        },
                    },
                }));
            }

            static remove_notificacao(id: string): void {
                store.setState((state: any) => ({
                    states: {
                        ...state.states,
                        notificacoes: {
                            ...state.states.notificacoes,
                            data: state.states.notificacoes.data.filter((notificacao: any) => notificacao.id !== id),
                        },
                    },
                }));
            }
        };
    };

    static Notificacao = () => {
        const notificacoes = message.contexto.jsx.get_notificacoes();

        const getNotificationConfig = (type: MessageType) => {
            switch (type) {
                case "success":
                    return {
                        bgColor: "bg-green-600",
                        borderColor: "border-green-700",
                        textColor: "text-white",
                        iconBgColor: "bg-green-700/20",
                        iconColor: "text-green-100",
                        icon: (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ),
                    };
                case "error":
                    return {
                        bgColor: "bg-red-600",
                        borderColor: "border-red-700",
                        textColor: "text-white",
                        iconBgColor: "bg-red-700/20",
                        iconColor: "text-red-100",
                        icon: (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ),
                    };
                case "warning":
                    return {
                        bgColor: "bg-amber-600",
                        borderColor: "border-amber-700",
                        textColor: "text-white",
                        iconBgColor: "bg-amber-700/20",
                        iconColor: "text-amber-100",
                        icon: (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ),
                    };
                case "info":
                    return {
                        bgColor: "bg-blue-600",
                        borderColor: "border-blue-700",
                        textColor: "text-white",
                        iconBgColor: "bg-blue-700/20",
                        iconColor: "text-blue-100",
                        icon: (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ),
                    };
            }
        };

        return (
            <div className="fixed top-4 right-4 z-50 space-y-4">
                {notificacoes.data.map((notification) => {
                    const config = getNotificationConfig(notification.type);

                    return (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            config={config}
                            onClose={() => message.contexto.state.remove_notificacao(notification.id)}
                        />
                    );
                })}
            </div>
        );
    };
};

const NotificationItem: React.FC<{
    notification: MessageNotification;
    config: { bgColor: string; icon: React.ReactNode };
    onClose: () => void;
}> = ({ notification, config, onClose }) => {
    useEffect(() => {
        if (notification.autoHideDuration) {
            const timer = setTimeout(() => {
                onClose();
            }, notification.autoHideDuration);

            return () => clearTimeout(timer);
        }
    }, [notification.autoHideDuration, onClose]);

    return (
        <div className={`${config.bgColor} text-white p-4 rounded-lg shadow-lg max-w-sm animate-slide-in-right cursor-pointer`} role="alert">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">{config.icon}</div>
                <div className="flex-grow">
                    <p className="text-sm font-medium">{notification.message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded p-1 transition-colors duration-200"
                    aria-label="Fechar notificação"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default message;
