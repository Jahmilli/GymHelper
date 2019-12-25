import React, { ChangeEvent } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackOptions, NavigationStackProp } from 'react-navigation-stack';
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler';
// import { exercises } from '../../utilities/Constants';
import { SPLIT_TYPE, Exercise } from '../../logic/domains/Workout.domain';
import { getAllExercises } from '../../logic/functions/exercies';

type Props = {
  navigation: NavigationStackProp<{ exerciseType: SPLIT_TYPE }>
}

class AddExercise extends React.Component<Props> {
  state = {
    exercises: []
  }
  splitType = this.props.navigation.getParam("splitType", "No Type Provided");


  componentDidMount() {
    const getExercises = async () => {
      try {
        // console.log('splti is ', splitType);
        const exerciseResults: any = await getAllExercises(this.splitType);
        const jsonResults = await exerciseResults.json();
        this.setState({
          exercises: jsonResults
        })
      } catch(err) {
        console.log('An error occurred when getting all exercises', err);
      }

    }
    console.log('calling get exercises');
    getExercises();
  }


  static navigationOptions = ({ navigation }): NavigationStackOptions => {
    return {
      title: "Add Exercise Type" 
    }
  }
  
  handlePress(item: Exercise) {
    this.props.navigation.navigate('CreateWorkout', { exercise: item })
    // this.props.navigation.navigate({routeName: "CreateWorkout", params: item})
  }

  render() {
    return (
    <View style={styles.container}>
      <Text>Type is {this.splitType}</Text>
    <FlatList<Exercise>
      data={this.state.exercises}
      keyExtractor={(item: Exercise) => item.name }
      renderItem={({ item }) => (
        <TouchableNativeFeedback 
          onPress={() => this.handlePress(item)}
          style={styles.item}>
          <View>
            <Text>{item.name}</Text>
            <Text>{item.bodyPart}</Text>
          </View>
        </TouchableNativeFeedback>
      )}
    />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25
  },
  item: {
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 18,
    height: 44,
    marginTop: 4
  }
});

export default AddExercise;