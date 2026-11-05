import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Formulario from '../components/Formulario';
import Editar from './Editar';
import { dadosIniciais } from '../data/data';
import { cores } from '../styles/cores';

function Cabecalho({ total }) {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerEtiqueta}>SAEP  /  GESTÃO DE PESSOAS</Text>
      <Text style={styles.bannerTitulo}>Cadastro de funcionários</Text>
      <Text style={styles.bannerDescricao}>Organize as informações dos colaboradores em um só lugar.</Text>
      <View style={styles.bannerRodape}>
        <View style={styles.ponto} />
        <Text style={styles.bannerRodapeTexto}>
          {total} {total === 1 ? 'funcionário cadastrado' : 'funcionários cadastrados'}
        </Text>
      </View>
    </View>
  );
}

function CartaoFuncionario({ item, editar }) {
  const iniciais = item.nome.trim().split(/\s+/).slice(0, 2).map((parte) => parte[0] || '').join('').toUpperCase();
  return (
    <View style={styles.cartao}>
      <View style={styles.cartaoCorpo}>
        <View style={styles.avatar}><Text style={styles.avatarTexto}>{iniciais}</Text></View>
        <View style={styles.cartaoInfo}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.metadado}>CPF  <Text style={styles.valor}>{item.cpf}</Text></Text>
          <Text style={styles.metadado}>CEP  <Text style={styles.valor}>{item.cep}</Text></Text>
          <Text style={styles.metadado}>ENDEREÇO  <Text style={styles.valor}>{item.logradouro} · {item.bairro}</Text></Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.editarBotao}
        onPress={editar}
        accessibilityRole="button"
        accessibilityLabel={`Editar cadastro de ${item.nome}`}
      >
        <Text style={styles.editarTexto}>Editar cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Home() {
  const [lista, setLista] = useState(() => [...dadosIniciais]);
  const [itemEmEdicao, setItemEmEdicao] = useState(null);

  const adicionarFuncionario = (novoItem) => setLista((anterior) => [...anterior, novoItem]);
  const salvarEdicao = (itemAtualizado) => {
    setLista((anterior) => anterior.map((item) => item.id === itemAtualizado.id ? itemAtualizado : item));
    setItemEmEdicao(null);
  };

  if (itemEmEdicao) {
    return (
      <Editar
        item={itemEmEdicao}
        onSalvar={salvarEdicao}
        onCancelar={() => setItemEmEdicao(null)}
      />
    );
  }

  return (
    <FlatList
      style={styles.pagina}
      contentContainerStyle={styles.conteudo}
      data={lista}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <Cabecalho total={lista.length} />
          <Formulario pagina="Cadastro" buttonName="Cadastrar funcionário" onSubmit={adicionarFuncionario} />
          <View style={styles.listaCabecalho}>
            <View>
              <Text style={styles.listaTitulo}>Funcionários cadastrados</Text>
              <Text style={styles.listaSubtitulo}>Consulte e edite os cadastros abaixo.</Text>
            </View>
            <View style={styles.contador}><Text style={styles.contadorTexto}>{lista.length}</Text></View>
          </View>
        </>
      }
      ListEmptyComponent={<Text style={styles.vazio}>Nenhum funcionário cadastrado.</Text>}
      renderItem={({ item }) => <CartaoFuncionario item={item} editar={() => setItemEmEdicao(item)} />}
    />
  );
}

const styles = StyleSheet.create({
  pagina: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { width: '100%', maxWidth: 1120, alignSelf: 'center', paddingHorizontal: 18, paddingTop: 22, paddingBottom: 48 },
  banner: { backgroundColor: cores.principalEscuro, borderRadius: 16, paddingHorizontal: 26, paddingVertical: 25, marginBottom: 18 },
  bannerEtiqueta: { color: '#C9E8DB', fontSize: 11, fontWeight: '700', letterSpacing: 1.6, marginBottom: 11 },
  bannerTitulo: { color: '#FFFFFF', fontSize: 27, fontWeight: '700', marginBottom: 6 },
  bannerDescricao: { color: '#D6E7DF', fontSize: 14, lineHeight: 21 },
  bannerRodape: { flexDirection: 'row', alignItems: 'center', marginTop: 17 },
  ponto: { width: 8, height: 8, borderRadius: 4, backgroundColor: cores.destaque, marginRight: 8 },
  bannerRodapeTexto: { color: '#E6F2EC', fontSize: 12, fontWeight: '600' },
  listaCabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 12 },
  listaTitulo: { fontSize: 20, fontWeight: '700', color: cores.texto },
  listaSubtitulo: { fontSize: 12, color: cores.textoSecundario, marginTop: 3 },
  contador: { minWidth: 32, height: 32, borderRadius: 16, backgroundColor: cores.principalClaro, alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  contadorTexto: { fontSize: 14, fontWeight: '700', color: cores.principal },
  cartao: { backgroundColor: cores.superficie, borderWidth: 1, borderColor: cores.borda, borderRadius: 13, padding: 18, marginBottom: 11 },
  cartaoCorpo: { flexDirection: 'row', alignItems: 'flex-start' },
  avatar: { width: 46, height: 46, borderRadius: 13, backgroundColor: cores.principalClaro, justifyContent: 'center', alignItems: 'center', marginRight: 13 },
  avatarTexto: { color: cores.principal, fontWeight: '700', fontSize: 16 },
  cartaoInfo: { flex: 1, minWidth: 0 },
  nome: { color: cores.texto, fontSize: 16, fontWeight: '700', marginBottom: 7 },
  metadado: { color: cores.textoSecundario, fontSize: 11, fontWeight: '700', marginBottom: 5 },
  valor: { color: cores.texto, fontSize: 13, fontWeight: '400' },
  editarBotao: { backgroundColor: cores.principalClaro, borderRadius: 8, alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 9, marginTop: 14, marginLeft: 59 },
  editarTexto: { color: cores.principalEscuro, fontSize: 12, fontWeight: '700' },
  vazio: { color: cores.textoSecundario, padding: 16 },
});
