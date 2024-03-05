import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Modal } from 'antd';
import dinoImage from './dino.png';

function App() {
  const [series, setSeries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Carregar dados salvos do localStorage quando o componente é montado
  useEffect(() => {
    const savedSeries = localStorage.getItem('series');
    if (savedSeries) {
      setSeries(JSON.parse(savedSeries));
    }
  }, []);

  // Salvar dados no localStorage sempre que a variável 'series' for atualizada
  useEffect(() => {
    localStorage.setItem('series', JSON.stringify(series));
  }, [series]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const adicionarSerie = (nome, episodios) => {
    setSeries([...series, {
      id: series.length,
      name: nome,
      episodios: parseInt(episodios) || 0
    }]);
  };

  const handleAdicionar = (id) => {
    setSeries(series.map(serie => {
      if (serie.id === id) {
        return { ...serie, episodios: serie.episodios + 1 };
      }
      return serie;
    }));
  };

  const handleRemover = (id) => {
    setSeries(series.map(serie => {
      if (serie.id === id && serie.episodios > 0) {
        return { ...serie, episodios: serie.episodios - 1 };
      }
      return serie;
    }));
  };

  return (
    <div id='app'>
      {series.length === 0 ? (
        <div>
          <p>Uau, que vazio...</p>
          <img src={dinoImage} alt="Empty Image" style={{ width: '200px', height: '250px' }} />
        </div>
      ) : (
        series.map(serie => (
          <Card 
            key={serie.id} 
            title={serie.name} 
            className="App-Card"
          >
            <p>Episódios assistidos: {serie.episodios}</p>
            <Button onClick={() => handleAdicionar(serie.id)}>+1</Button>
            <Button onClick={() => handleRemover(serie.id)}>-1</Button>
          </Card>
        ))
      )}

      <div id='addbutton'>
        <Button shape='circle' onClick={handleOpenModal} id='add-button'>+</Button>
      </div>
      
      <CustomModal visible={modalVisible} onClose={handleCloseModal} adicionarSerie={adicionarSerie} />
    </div>
  );
}

const CustomModal = ({ visible, onClose, adicionarSerie }) => {
  const [nomeModal, setNomeModal] = useState('');
  const [episodiosModal, setEpisodiosModal] = useState('');

  const handleNomeChange = (e) => {
    setNomeModal(e.target.value);
  };

  const handleEpisodiosChange = (e) => {
    setEpisodiosModal(e.target.value);
  };

  const handleAdicionarSerie = () => {
    adicionarSerie(nomeModal, episodiosModal);
    setNomeModal('');
    setEpisodiosModal('');
    onClose();
  };

  return (
    <Modal 
      title="Add"
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div id='inputs'>
        <Input 
          placeholder="Nome da série" 
          value={nomeModal} 
          onChange={handleNomeChange} 
        />
        <Input 
          placeholder="Episódios assistidos" 
          value={episodiosModal} 
          onChange={handleEpisodiosChange} 
        />
        <Button onClick={handleAdicionarSerie} >Adicionar</Button>
      </div>
    </Modal>
  );
};

export default App;
