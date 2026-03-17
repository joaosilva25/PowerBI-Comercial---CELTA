export interface KPIMetrics {
  faturamentoTotal: string;
  quantidadeTotal: number;
  ticketMedio: string;
}

export interface DashboardData {
  faturamentoPorServico: { servico: string; faturamento: number }[];
  faturamentoPorCliente: { cliente: string; faturamento: number }[];
  faturamentoPorRepresentante: { representante: string; faturamento: number }[];
  quantidadePorCidade: { cidade: string; quantidade: number }[];
  quantidadePorSituacao: { situacao: string; quantidade: number }[];
  kpiMetrics: KPIMetrics;
}

// API Response Types
export interface ApiResumo {
  faturamento_total: string;
  quantidade_total: number;
}

export interface ApiOpcionalResumo {
  sim: number;
  nao: number;
  total: number;
  percentual: string;
}

export interface ApiOpcionais {
  nacionalizado: ApiOpcionalResumo;
  cosmetica: ApiOpcionalResumo;
  pintura_interna: ApiOpcionalResumo;
  pintura_externa: ApiOpcionalResumo;
  piso: ApiOpcionalResumo;
}

export interface ApiQuantidadePor {
  cidade: Record<string, number>;
  representante: Record<string, number>;
  cliente: Record<string, number>;
  situacao: Record<string, number>;
  empresa_contrato: Record<string, number>;
  frota: Record<string, number>;
  servico: Record<string, number>;
  pagamento: Record<string, number>;
}

export interface ApiFaturamentoPor {
  cidade: Record<string, number>;
  representante: Record<string, number>;
  cliente: Record<string, number>;
  servico: Record<string, number>;
}

export interface ApiDashboardData {
  resumo: ApiResumo;
  opcionais: ApiOpcionais;
  quantidade_por: ApiQuantidadePor;
  faturamento_por: ApiFaturamentoPor;
}
