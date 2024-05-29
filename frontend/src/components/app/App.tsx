import '@fontsource/inter';

import './App.css';
import DocumentBox from '../documentBox/DocumentBox';
import AutoSelectBox from '../autoSelectBox/AutoSelectBox';
import Window from '../window/Window';
import { useShallow } from 'zustand/react/shallow';
import { useLineStore } from '../../stores/lineStore';
import { Button, Sheet, Stack } from '@mui/joy';
import UploadFile from '../uploadFile/UploadFile';

function App() {
  const isReady = useLineStore(useShallow((state) => state.pdfFilePath !== null));

  return (
    <div className='App'>
      {isReady ? (
        <>
          <div className='pdf_view_box'>
            <DocumentBox />
          </div>
          <Window>
            <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={2}>
              <Button onClick={() => useLineStore.getState().generateFinalFile()}>Generate Final File</Button>
              <AutoSelectBox />
              <Button onClick={() => useLineStore.getState().generateFinalFile()}>Generate Final File</Button>
            </Stack>
          </Window>
        </>
      ) : (
        <>
          <Sheet className='upload-container'>
            <UploadFile />
          </Sheet>
        </>
      )}
    </div>
  );
}

export default App;
