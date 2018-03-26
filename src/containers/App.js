import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
// import Person from '../components/Persons/Person/Person';
// import Validation from '.../components/Validation/Validation'
// import Char from '../components/Char/Char'
import Persons from '../components/Persons/Persons';



class App extends Component    {

  state = {
    persons: [
      {name:"Max", age: 28},
      {name:"Manu", age:29},
      {name:"Stephen", age:27},
      {name:"Shruti", age:26},
    ],

    otherState: 'some other state',
    showPersons: false // importing variable
  }

  // switchNameHandler = (newName) => {
  //   // console.log("this is demo")
  //   //Don't do this 
  //   //this.state.persons[0].name="Maximillium";
    
  //   //The component object has "setState()", allow us to update the special state props takes 
  //   //an obj as a an arg and merge it with existing data.
  //   this.setState({
  //     persons: [
  //       {name:newName, age: 28},
  //       {name:"Manu", age:29},
  //       {name:"Stephen", age:26},
  //       {name:"Shruti", age:26}
  //     ]
  //   })
  // }

  deletePersonsHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons] //list of elements to store the data before manipulating
    persons.splice(personIndex, 1);
    this.setState({
      persons: persons
    })
  }
  
  //findIndex is used to find the index of the person
  
  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });

    const person = {
      ...this.state.persons[personIndex] // here we are mutating the original object which the pointer points not directly mutating.
    };

    // const person = Object.assign({}, this.state.person[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})
  
    // this.setState({
    //   persons: [
    //     {id: 'aaa', name:"Max", age: 28},
    //     {id: 'bbb', name: event.target.value, age:29},
    //     {id: 'ccc', name:"Stephen", age:26},
    //     {id: 'ddd', name:"Shruti", age:26}
    //   ]
    // })  
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }
  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1x solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;
    //If you want to render the list conditionaly
    //Here map = javascript default function is used to map he objects, strings etc.
    //and react pull out these elements and render th e expected output
    //deleteing and updating the values here

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
              persons={this.state.persons}
              clicked={this.deletePersonsHandler}
              changed={this.nameChangeHandler} />
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover']={
        backgroundColor: 'salmon',
        color: 'black'
      }

    }

    //here anonymous fun defeined [change = {(event) => this.nameChangeHandler()}]


    //stying the text:

    // let classes = ['red', 'bold'].join(' ');
    //for conditional styling the text:
    let classes = [];
    if (this.state.persons.length <= 3) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }


    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I am React App</h1>
          <p className={classes.join(' ')}>This is really working</p>
          <button 
            style={style} 
            // onClick={() => this.switchNameHandler('Maximillium!!!')}>Switch Name</button>
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
      </StyleRoot>
    );
  //return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Hi, I \'m a React App..!!!'));
  }
}

//map returns the new array

// class App extends Component {

//   state = {
//     userInput:""
//   }

//   inputChangeHandler = (event) => {
//     this.setState({userInput: event.target.value});
//   }

//   deleteCharHandler = (index) => {
//     const text = this.state.userInput.split('');
//     text.splice(index, 1);
//     const updatedText = text.join('');
//     this.setState({userInput:updatedText});
//   }

//   render(){

//     const charList = this.state.userInput.split('').map((ch, index) => {
//       return <Char 
//       character={ch} 
//       key={index}
//       clicked={() => this.deleteCharHandler(index)} />;
//     });

//     return(
//       <div className="App">
//         <h2>Assignment</h2>
//         <ol>
//           <li>Create an input feild(in App component) with change listener which outputs the length of the entered text below it</li>
//         </ol>
//         <hr/>
//         <input type="text" onChange={this.inputChangeHandler} value = {this.state.userInput} />
//         <p>{this.state.userInput}</p>
//         <Validation inputLength={this.state.userInput.length}/>
//         {charList}
//       </div>
//     )
//   }
// }
export default Radium(App);


//*****************************************************************************
//Replaced with <Person/>
// {this.state.persons.map((person, index) => {
//     return <Person
//       click={() => props.clicked(index)}
//       name={person.name} 
//       age={person.age} 
//       key={person.id}
//       change = {(event) => props.changed(event, person.id)} />
//   });