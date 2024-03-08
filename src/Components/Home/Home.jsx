import React from 'react'
import "./homeStyle.css"
import { Button } from '../Button/Button';


export const Home = () => {
  return (
    <div className='main'>
      <div className='text'>
        <h1 className='heading'>Quizzical</h1>
        <p>Some description if needed</p>
      </div>
      <Button path="/questions" name="Start Quiz"/>
    </div>
  )
}