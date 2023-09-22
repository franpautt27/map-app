import { useEffect, useState } from 'react'
import {Region} from 'react-native-maps'


const useDebuncedRegionData = (inputRegion: Region, time = 500) => {
    const [debouncedRegion, setDebouncedRegion] = useState(inputRegion)


    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedRegion(inputRegion)
        }, time);
  
        return ()=>{
          clearTimeout(timeout);
        }
      }, [inputRegion])

  return debouncedRegion
   
  
}

export default useDebuncedRegionData