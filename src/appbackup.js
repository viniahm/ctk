import React, { useState } from 'react';
import { List, Input, Button, Card } from 'antd';
import CustomModal from './components/modal'; // Importando o componente de modal

function App() {
  const [series, setSeries] = useState([]);
  const [nome, setNome] = useState('');
  const [episodios, setEpisodios] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  const adicionarSerie = () => {
    setSeries([...series, {
      id: series.length,
      name: nome,
      episodios: episodios
    }]);
  
    setNome('');
    setEpisodios('');
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div id='app'>
      <div id='inputs'>
        <Input 
          placeholder="Nome da série" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <Input 
          placeholder="Episódios assistidos" 
          value={episodios} 
          onChange={(e) => setEpisodios(e.target.value)} 
        />
      </div>
      <Button onClick={adicionarSerie} id='botao'>Adicionar Série</Button>
      <Button onClick={handleOpenModal}>Abrir Modal</Button>
      <CustomModal visible={modalVisible} onClose={handleCloseModal} /> {/* Renderizando o modal com base no estado modalVisible */}
      {series.map(serie => (
        <Card 
          key={serie.id} 
          title={serie.name} 
          className="App-Card"
        >
          <p>Episódios assistidos: {serie.episodios}</p>
        </Card>
      ))}
    </div>
  );
}

export default App;
