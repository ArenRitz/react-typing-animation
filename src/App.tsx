import cn from 'classnames'
import { useEffect, useState } from 'react'
import './app.css'
import { Status, useCurText } from './useCurText'

const greetings = ['Hello', 'Ciao', 'Bonjour', 'Hola', 'Hallo', 'Hej', 'Olá', '你好', 'こんにちは', '안녕하세요', 'नमस्ते', 'مرحبا', 'שלום', 'Здравствуйте', 'Привет', 'नमस्कार', 'Ahoj', 'Hei', 'Sveiki', 'Salam', 'Sawubona', 'Selam', 'Dia dhuit', 'Labas', 'Kamusta', 'Sawasdee', 'Namaste']



function App() {
  

  const {curText, curFullText, status} = useCurText(greetings)
  
  return (
    <div className="App">
        <div>
          <span className={cn('test', {['blink']: status != Status.Deleting})} aria-label={curFullText}> {curText} </span>
        </div>
    </div>
  )
}

export default App
