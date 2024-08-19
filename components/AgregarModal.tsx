import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, TextInput } from 'react-native';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAction, closeModalAction } from '@/actions/userActions';
import CustomButton from './CustomButton';

const AgregarModal: React.FC = () => {
  const modalOpen: boolean = useSelector((state: RootState) => state.currentData.modalOpen);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState('');

  const handleCloseModal = () => {
    dispatch(closeModalAction()); //Usa el reducer para update el global store.
    setTaskTitle(''); // Borrar input cuando se sale del modal
  };

  const handleAddTask = () => {
    if (taskTitle.trim()) { //Asegurarse que no sea un empty string
      dispatch(addTaskAction(taskTitle)) //Usa el reducer para update el global store
      handleCloseModal(); 
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalOpen}
      onRequestClose={handleCloseModal}
    >
      {/* Agregar la funcionalidad de salir del modal al tocar el backdrop */}
      <TouchableWithoutFeedback testID='background-close' onPress={handleCloseModal}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Agregar nuevo Task</Text>
              <TextInput
                style={styles.input}
                onChangeText={setTaskTitle}
                value={taskTitle}
                placeholder="Inserte el task"
                placeholderTextColor="#888"
              />
              {/* Hace que el button no aparesca cuando esta vacio o son solo espacios */}
              {taskTitle.trim() && <CustomButton style={styles.addButton} text={'Agregar task'} type={'Action'} onPress={handleAddTask}/> } 
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default AgregarModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 35,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').width * 0.8,
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    marginBottom: 10,
    width: "100%"
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
