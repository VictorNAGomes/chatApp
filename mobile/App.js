import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { io } from 'socket.io-client'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatMessage: '',
      chatMessages: []
    }
  }

  componentDidMount() {
    this.socket = io('http://192.168.3.26:8080')
    this.socket.on('chatMessage', msg => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]})
    })
  }

  submitChatMessage(){
    this.socket.emit('chatMessage', this.state.chatMessage)
    this.setState({chatMessage: ''})
  }

  render() {
    this.chatMessages = this.state.chatMessages.map(chatMessage => ( <Text key={chatMessage}>{chatMessage}</Text> ))
    return(
      <View style={styles.container}>
        <View>
        {this.chatMessages}
        </View>
        <TextInput 
          style={styles.input}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({chatMessage})
          }}
        />
      </View>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    margin: 7,
    justifyContent: 'space-between'
  },
  input: {
    height: 40,
    borderWidth: 2,
  }
});
