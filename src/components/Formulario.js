import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { cores } from '../styles/cores';

function Campo({ titulo, dica, valor, aoMudar, teclado, maxLength, acessibilidade }) {
  return (
    <View style={styles.campo}>
      <Text style={styles.rotulo}>{titulo}</Text>
      <TextInput
        style={styles.input}
        placeholder={dica}
        placeholderTextColor="#96A79D"
        value={valor}
        onChangeText={aoMudar}
        keyboardType={teclado || 'default'}
        maxLength={maxLength}
        accessibilityLabel={acessibilidade || titulo}
      />
    </View>
  );
}

export default function Formulario({ dados, pagina, buttonName, onSubmit }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [loading, setLoading] = useState(false);
  const [aviso, setAviso] = useState('');
  const numeroConsulta = useRef(0);
  const { width } = useWindowDimensions();
  const colunas = width >= 760;
  const editando = pagina === 'Editar';

  useEffect(() => {
    if (dados && editando) {
      setNome(dados.nome || '');
      setCpf(dados.cpf || '');
      setCep(dados.cep || '');
      setLogradouro(dados.logradouro || '');
      setBairro(dados.bairro || '');
    }
    return () => { numeroConsulta.current += 1; };
  }, [dados, editando]);

  const buscarCep = async (valorDigitado) => {
    const cepLimpo = valorDigitado.replace(/\D/g, '').slice(0, 8);
    const cepFormatado = cepLimpo.length > 5
      ? `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5)}`
      : cepLimpo;
    setCep(cepFormatado);
    setAviso('');
    numeroConsulta.current += 1;
    const consultaAtual = numeroConsulta.current;
    if (cepLimpo.length !== 8) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      if (!resposta.ok) throw new Error('Consulta indisponível');
      const endereco = await resposta.json();
      if (consultaAtual !== numeroConsulta.current) return;
      if (endereco.erro) {
        setAviso('CEP não encontrado. Confira os números ou digite o endereço.');
        return;
      }
      setLogradouro(endereco.logradouro || '');
      setBairro(endereco.bairro || '');
    } catch (_) {
      if (consultaAtual === numeroConsulta.current) {
        setAviso('Não foi possível consultar o CEP. Você pode preencher o endereço manualmente.');
      }
    } finally {
      if (consultaAtual === numeroConsulta.current) setLoading(false);
    }
  };

  const enviar = () => {
    if (![nome, cpf, cep, logradouro, bairro].every((texto) => texto.trim())) {
      setAviso('Preencha todos os campos para continuar.');
      return;
    }
    setAviso('');
    onSubmit({
      id: dados?.id || `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      nome: nome.trim(),
      cpf: cpf.trim(),
      cep: cep.trim(),
      logradouro: logradouro.trim(),
      bairro: bairro.trim(),
    });
    if (!editando) {
      numeroConsulta.current += 1;
      setNome('');
      setCpf('');
      setCep('');
      setLogradouro('');
      setBairro('');
    }
  };

  return (
    <View style={styles.formulario}>
      <View style={styles.cabecalho}>
        <View style={styles.marcador}><Text style={styles.marcadorTexto}>+</Text></View>
        <View style={styles.cabecalhoTexto}>
          <Text style={styles.titulo}>{editando ? 'Editar funcionário' : 'Novo funcionário'}</Text>
          <Text style={styles.subtitulo}>Preencha os dados para {editando ? 'atualizar o cadastro.' : 'realizar um cadastro.'}</Text>
        </View>
      </View>

      <View style={styles.secaoTituloLinha}>
        <View style={styles.linhaDestaque} />
        <Text style={styles.secaoTitulo}>DADOS PESSOAIS</Text>
      </View>
      <View style={[styles.linhaCampos, !colunas && styles.linhaVertical]}>
        <View style={colunas ? styles.campoMaior : styles.campoInteiro}>
          <Campo titulo="Nome completo" dica="Ex.: Ana Oliveira" valor={nome} aoMudar={setNome} />
        </View>
        <View style={colunas ? styles.campoMenor : styles.campoInteiro}>
          <Campo titulo="CPF" dica="000.000.000-00" valor={cpf} aoMudar={setCpf} teclado="numeric" />
        </View>
      </View>

      <View style={styles.secaoTituloLinha}>
        <View style={styles.linhaDestaque} />
        <Text style={styles.secaoTitulo}>ENDEREÇO</Text>
      </View>
      <View style={[styles.linhaCampos, !colunas && styles.linhaVertical]}>
        <View style={colunas ? styles.campoMenor : styles.campoInteiro}>
          <Campo titulo="CEP" dica="00000-000" valor={cep} aoMudar={buscarCep} teclado="numeric" maxLength={9} />
        </View>
        <View style={colunas ? styles.campoMaior : styles.campoInteiro}>
          <Campo titulo="Logradouro" dica="Rua ou avenida" valor={logradouro} aoMudar={setLogradouro} />
        </View>
      </View>
      {loading ? (
        <View style={styles.consulta}>
          <ActivityIndicator color={cores.principal} size="small" />
          <Text style={styles.consultaTexto}>Buscando endereço pelo CEP...</Text>
        </View>
      ) : null}
      <Campo titulo="Bairro" dica="Nome do bairro" valor={bairro} aoMudar={setBairro} />
      <Text style={styles.dicaCep}>Ao informar o CEP, o endereço pode ser preenchido automaticamente.</Text>

      {aviso ? <Text style={styles.aviso}>{aviso}</Text> : null}
      <TouchableOpacity
        style={styles.botaoEnviar}
        onPress={enviar}
        accessibilityRole="button"
      >
        <Text style={styles.botaoTexto}>{buttonName}</Text>
        <Text style={styles.botaoSeta}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formulario: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
  },
  cabecalho: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  marcador: {
    width: 43, height: 43, borderRadius: 13, backgroundColor: cores.principalClaro,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  marcadorTexto: { fontSize: 27, fontWeight: '400', color: cores.principal, marginTop: -3 },
  cabecalhoTexto: { flex: 1 },
  titulo: { fontSize: 22, fontWeight: '700', color: cores.texto },
  subtitulo: { marginTop: 3, color: cores.textoSecundario, fontSize: 13 },
  secaoTituloLinha: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 2 },
  linhaDestaque: { width: 16, height: 3, borderRadius: 2, backgroundColor: cores.destaque, marginRight: 9 },
  secaoTitulo: { fontSize: 11, fontWeight: '700', letterSpacing: 1.3, color: cores.principal },
  linhaCampos: { flexDirection: 'row', gap: 14, marginBottom: 8 },
  linhaVertical: { flexDirection: 'column', gap: 0 },
  campoMaior: { flex: 2 },
  campoMenor: { flex: 1 },
  campoInteiro: { width: '100%' },
  campo: { marginBottom: 14, minWidth: 0 },
  rotulo: { marginBottom: 7, fontSize: 13, fontWeight: '600', color: cores.texto },
  input: {
    minHeight: 45,
    backgroundColor: cores.campo,
    borderColor: cores.borda,
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 13,
    paddingVertical: 9,
    fontSize: 14,
    color: cores.texto,
  },
  dicaCep: { fontSize: 12, color: cores.textoSecundario, marginTop: -2, marginBottom: 17 },
  consulta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  consultaTexto: { fontSize: 12, color: cores.principal },
  aviso: { color: cores.alerta, marginBottom: 12, fontSize: 13 },
  botaoEnviar: {
    backgroundColor: cores.principal,
    borderRadius: 10,
    minHeight: 47,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  botaoTexto: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  botaoSeta: { color: '#FFFFFF', fontSize: 19 },
});
