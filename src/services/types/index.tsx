export type TypeLogin = {
    username: string | FormDataEntryValue | null;
    password: string | FormDataEntryValue | null;
  }

  export type TypeSaveUser = {
    nome: string;
    email: string;
    permission: string;
    senha: string;
  }

  export type TypeEditUser = {
    nome: string;
    email: string;
    permission: string;
  }
  
  export type TypeUser = {
    id: number;
    nome: string;
    email: string;
    permission: string;
  }
  
  export type TypeContato = {
    telefones: TypeTelefone[];
    emails: TypeEmail[];
  }
  
  export type TypeTelefone = {
    id?: number;
    numero: string;
    obs?: string;
    pais_origem?: string;
  }
  
  export type TypeEmail = {
    id?: number;
    email: string;
    obs?: string;
  }
  
  export type TypeEndereco = {
    rua: string;
    tipo?: string;
    bairro: string;
    numero: string;
    complemento?: string;
    cidade: string;
    cep: string;
    referencia?: string;
  }
  
  export type TypeRoles = {
    id?: number;
    name: string;
  }
  
  export type TypePaciente = {
    id: number;
    nome: string;
    cpf: string;
    rg: string;
    dataNascimento: string;
    sexo: string;
    peso: number;
    altura: number;
    contato: TypeContatoPaciente;
    enderecos: TypeEnderecoPaciente[];
    deletedAt?: string;
    matricula?: string;
    patientId?: number;
  }
  
  export type TypeEditPaciente = {
    nome?: string,
    id?: number,
    peso: number,
    altura: number,
    contato: TypeContatoPaciente,
    enderecos: TypeEnderecoPaciente[]
  }
  
  export type TypePacientePost = {
    nome: string;
    cpf: string;
    rg: string;
    dataNascimento: string;
    sexo: string;
    peso: number;
    altura: number;
    contato: TypeContatoPaciente;
    enderecos: TypeEnderecoPaciente[];
  }
  
  export type TypeContatoPaciente = {
    id?: number,
    telefones: TypeTelefone[];
    emails:  TypeEmail[];
  }
  
  export type TypeEnderecoPaciente = {
    id?: number;
    tipo: string;
    rua: string;
    numero: string;
    cidade: string;
    bairro: string;
    uf: string;
    cep: string;
    referencia: string;
    complemento?: string | null;
  }
  
  export type TypeVeiculos = {
    id: number;
    placa: string;
    tipoVeiculoId: number;
    veiculoStatusId: number;
    tipoVeiculo: TypeTipoVeiculos;
    veiculoStatus: TypeVeiculoStatus;
    vacinacao: string;
    examePadrao: string;
  }
  
  export type TypeTipoVeiculos = {
    nome_veiculo: string;
    volume: number;
    peso: number;
    valor: number;
    caixas: number;
    velocidade_media: number;
    consumo_combustivel: number;
    tipoCombustivelId: number;
    ocupacao_min: number;
    ocupacao_max: number;
    distancia_max_viagem: number;
    distancia_max_entre_paradas: number;
    max_tempo_viagem: number;
    max_paradas: number;
    quantidade_eixos: number;
    centro_expandido: boolean;
  }
  
  export type TypeVeiculoStatus = {
    id: number;
    descricao?: string;
  }
  
  export type TypeSaveVeiculo = {
    placa?: string,
    veiculoStatusId?: number,
    tipoVeiculoId?: number
  
  }
  
  export type TypeEditVeiculo = {
    placa?: string,
    veiculoStatus : {
      id: number;
    }
  }

  export type SenhaPreferencial = {
    preferencial: string;
    nome: string;
  }

  export type SenhaTela = {
    preferencial: string;
    nome: string;
    numeroSenha: string;
  }

  export type TypeUserCaixa = {
    id: number;
    nome: string;
    email: string;
    permission: string;
    senhaAtenderId: string;
  }