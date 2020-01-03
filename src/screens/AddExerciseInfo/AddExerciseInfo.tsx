import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { ISet, IWorkoutExercise, WEIGHT_UNIT } from "../../logic/domains/Workout.domain";
import { View, StyleSheet, Text, TextInput, Button, FlatList, Dimensions } from "react-native";

type Props = {
  navigation: NavigationStackProp;
}

const numColumns = 3;
const initialSet = {
  repetitions: 0,
  restTime: 0,
  setNumber: 0,
  weight: 0
}
class AddExerciseInfo extends React.Component<Props> {
  exercise: IWorkoutExercise = this.props.navigation.getParam("exercise", null);
  isUserWorkout: boolean = this.props.navigation.getParam("isUserWorkoutExercise", false);
  
  state = {
    sets: [],
    // Used when editing a particular set
    currentSet: {
      ...initialSet
    },
    updatingSet: false
  }

  transformSetsToUserSets = (set: ISet[]) => {
    return set.map((set: ISet) => {
      return {
        ...set,
        weight: set.weight || 0,
        weightUnit: set.weightUnit || WEIGHT_UNIT.KILOGRAM
      }
    });
  }

  componentDidMount() {
    const sets = this.isUserWorkout ? this.transformSetsToUserSets(this.exercise.sets) : this.exercise.sets;

    if (sets) {
      const currentSet = {
        ...sets[sets.length - 1]
      };
      currentSet.setNumber = currentSet.setNumber + 1;
      this.setState({
        sets,
        currentSet
      });
    }
  }

  handleInputChange = (key: string) => (text: string) => {
    const currentSet = { ...this.state.currentSet }
    currentSet[key] = parseInt(text) || 0;
    this.setState({ currentSet });
  }

  // When add set is pressed
  handleAddSet = () => {
    this.setState({
      sets: [...this.state.sets, this.state.currentSet],
      currentSet: {
        ...this.state.currentSet,
        setNumber: this.state.currentSet.setNumber + 1
      }
    });
  }
  
  // When update button is pressed
  handleUpdateSet = () => {
    const sets = [...this.state.sets];
    sets[this.state.currentSet.setNumber] = { ...this.state.currentSet } // Using spread to create a new object but might not need to do this
    this.setState({
      sets,
      updatingSet: false,
      currentSet: {
        ...this.state.currentSet,
        setNumber: this.state.sets.length
      }
    });
  }

  // When a set is pressed
  handlePressSet = (set: ISet) => {
    this.setState({
      currentSet: set,
      updatingSet: true
    })
  }

  renderSet = ({ item }: { item: ISet }) => {
    return (
      <View style={styles.set}>
        <Text style={styles.setNumber} onPress={() => this.handlePressSet(item)}>Set Number: {item.setNumber + 1}</Text>
        <Text style={styles.setRepetitions}>Reps: {item.repetitions}</Text>
        <Text style={styles.setRestTime}>Rest Time: {item.restTime}</Text>
        { this.isUserWorkout ?
          <Text style={styles.setRepetitions}>weight: {item.weight} {item.weightUnit}</Text>
          : null
        }
      </View>
    );
  }

  handleSubmit = () => {
    this.props.navigation.state.params.updateSets(this.exercise, this.state.sets);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>{this.exercise.name}</Text>
          <Text>{this.exercise.description}</Text>
          <Text>{this.exercise.splitType}</Text>
          <Text>{this.exercise.bodyPart}</Text>
        </View>
        <View>
          <Text>Set: {this.state.currentSet.setNumber + 1}</Text>
          <Text>Repetitions</Text>
          <TextInput
            style={styles.input}
            onChangeText={this.handleInputChange("repetitions")}
            keyboardType="numeric"
            value={this.state.currentSet.repetitions.toString()}
          />
          <Text>Rest Time (Seconds)</Text>
          <TextInput
            style={styles.input}
            onChangeText={this.handleInputChange("restTime")}
            keyboardType="numeric"
            value={this.state.currentSet.restTime.toString()}
          />

          { this.isUserWorkout ?
            <>
              <Text>Weight:</Text>
              <TextInput
                style={styles.input}
                onChangeText={this.handleInputChange("weight")}
                keyboardType="numeric"
                value={this.state.currentSet.weight.toString()}
              />
            </>
            : null
          }
          {
            this.state.updatingSet ?
            <Button
              title="Update Set"
              onPress={this.handleUpdateSet}
            />
            :
            <Button
              title="Add Set"
              onPress={this.handleAddSet}
            />
          }
        </View>
        <FlatList
          data={this.state.sets}
          style={styles.setList}
          renderItem={this.renderSet}
          keyExtractor={(set: ISet) => set.setNumber.toString()}
          numColumns={numColumns}
          />
        { this.state.sets.length > 0 ?
          <Button
              title="Done"
              onPress={this.handleSubmit}
            />
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: '#eee',
    marginBottom: 25,
    paddingLeft: 10,
    paddingRight: 1
  },
  setList: {
    flex: 1,
    marginVertical: 20
  },
  set: {
    backgroundColor: '#00bfff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns,
    borderRadius: 5
  },
  setNumber: {

  },
  setRepetitions: {

  },
  setRestTime: {

  }
});

export default AddExerciseInfo;