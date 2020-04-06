export interface Colaborador {
  id: number;
  cpf: string;
  rg: string;
  nome: string;
  dataNascimento: string;
  estadoCivil: number;
  sexo: string;
  email: string;
  situacao: number;
  situacaoDesc: string;
  telFixo: string;
  telCel: string;
  vinculo: number;
  funcao: number;
  formaPagamento: number;
  coordenadas: string;
  latitude: string;
  longitude: string;
  endereco: string;
  numero: number;
  complemento: string;
  municipio: string;
  estado: string;
  cep: string;
  pais: string;
}
