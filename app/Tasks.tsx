import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import TaskCard from '@/components/TaskCard';
import { Task } from '@/types/Task';
import CustomButton from '@/components/CustomButton';
import AgregarModal from '@/components/AgregarModal';
import { openModalAction } from '@/actions/userActions';

const Tasks: React.FC = () => {
  const tasks: Task[] = useSelector((state: RootState) => state.currentData.tasks);
  const dispatch = useDispatch();

  const renderItem = ({ item }: { item: Task }) => (
    <TaskCard task={item}/>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {tasks.length > 0 ? (
          <FlatList
            data={tasks}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            scrollEnabled={tasks.length > 5} // Adjust this number based on how many tasks fit in your screen
          />
        ) : (
          <Text style={styles.message}>No tienes tasks. Agrega una para verla!</Text>
        )}
      </View>
      <AgregarModal />
      <CustomButton 
        text='New Task' 
        type='Action' 
        style={styles.button} 
        onPress={() => dispatch(openModalAction())} 
      />
    </SafeAreaView>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10
  },
  listContent: {
    flexGrow: 1,
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
  },
});