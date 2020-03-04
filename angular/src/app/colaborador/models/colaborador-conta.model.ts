export interface ColaboradorConta {
  idColaborador: number;
  idConta: number;
  titular: string;
  nomeTitular: string;
  cpfTitular: string;
  idBanco: number;
  bancoDescricao: string;
  idSituacao: number;
  situacaoDescricao: string;
  tipo: number;
  agencia: number;
  conta: number;
  digito: number;
  operacao: number;
}
