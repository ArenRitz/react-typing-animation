import { useState, useEffect } from "react"

export enum Status {
  Typing,
  Pausing,
  Deleting,
}

const TYPING_INTERVAL = 300
const PAUSE_INTERVAL = 1000
const DELETING_INTERVAL = 50

export const useCurText = (arr: string[]): {
  curText: string,
  curFullText: string,
  status: Status;

} => {

    const [curText, setCurText] = useState('')
    const [status, setStatus] = useState(Status.Typing)
    const [index, setIndex] = useState(0)


   
    useEffect(() => {

      switch (status) {

// ******************************** TYPING ************************************
        case Status.Typing: {
          const nextText = arr[index].slice(0, curText.length + 1)
      
          if (nextText === curText) {
            setStatus(Status.Pausing)
            return
          }
      
          const timeout = setTimeout(() => {
            setCurText(nextText)
          }, TYPING_INTERVAL);
      
          return () => clearTimeout(timeout)
        }


// ******************************** DELETING ************************************
        case Status.Deleting: {
          if (!curText) {
            const nextIndex = index + 1;
            nextIndex >= arr.length ? setIndex(0) : setIndex(index + 1);
            
            setStatus(Status.Typing)

            return
          }

          const remainingText = arr[index].slice(0, curText.length - 1)
          
          const timeout = setTimeout(() => {
            setCurText(remainingText)
          }, DELETING_INTERVAL);
      
          return () => clearTimeout(timeout)
        }


// ******************************** PAUSING ************************************
        case Status.Pausing:
            const timeout = setTimeout(() => {
              setStatus(Status.Deleting)
            }, PAUSE_INTERVAL)
            return () => clearTimeout(timeout)
      }




    
    }, [curText, status, arr, index])
    
    return {curText, curFullText: arr[index], status}
  
  }