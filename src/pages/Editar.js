import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Formulario from '../components/Formulario';
import { cores } from '../styles/cores';

export default function Editar({ item, onSalvar, onCancelar }) {
  return (
    <ScrollView style={styles.pagina} contentContainerStyle={styles.conteudo}>
      <TouchableOpacity style={styles.voltar} onPress={onCancelar} accessibilityRole="button">
        <Text style={styles.voltarTexto}>←  Voltar à lista de funcionários</Text>
      </TouchableOpacity>
      <View style={styles.cabecalho}>
        <Text style={styles.etiqueta}>SAEP  /  GESTÃO DE PESSOAS</Text>
        <Text style={styles.titulo}>Atualizar cadastro</Text>
        <Text style={styles.descricao}>Altere os dados de {item.nome} e salve as mudanças.</Text>
      </View>
      <Formulario dados={item} pagina="Editar" buttonName="Salvar alterações" onSubmit={onSalvar} />
      <TouchableOpacity style={styles.cancelar} onPress={onCancelar} accessibilityRole="button">
        <Text style={styles.cancelarTexto}>Cancelar edição</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pagina: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { maxWidth: 1120, width: '100%', alignSelf: 'center', paddingHorizontal: 18, paddingTop: 22, paddingBottom: 50 },
  voltar: { alignSelf: 'flex-start', paddingVertical: 9, marginBottom: 12 },
  voltarTexto: { color: cores.principal, fontSize: 13, fontWeight: '700' },
  cabecalho: { backgroundColor: cores.principalEscuro, borderRadius: 16, paddingHorizontal: 26, paddingVertical: 25, marginBottom: 18 },
  etiqueta: { fontSize: 11, color: '#C9E8DB', fontWeight: '700', letterSpacing: 1.5, marginBottom: 10 },
  titulo: { fontSize: 26, color: '#FFFFFF', fontWeight: '700', marginBottom: 6 },
  descricao: { fontSize: 14, color: '#D6E7DF' },
  cancelar: { alignSelf: 'center', paddingHorizontal: 20, paddingVertical: 14, marginTop: 7 },
  cancelarTexto: { color: cores.alerta, fontSize: 13, fontWeight: '600' },
});
