import { Task } from '@/types/Task';
import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';

interface TaskCardProps {
  task: Task,
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  
  return (
    <View testID='container' style={styles.container} >
       <Text style={styles.text}>{task.title}</Text>
    </View>
  )
}
export default TaskCard;

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  container: {
    backgroundColor: 'white',
    marginVertical: 3,
    marginHorizontal: 'auto',
    padding: 20,
    width: '95%',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  }
});
