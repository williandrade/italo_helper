import { ViewMode, Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { searchPlugin } from '@react-pdf-viewer/search';
import { useState, useEffect } from 'react';

import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';

function DocumentBox() {
  const [fileUrl, setFileUrl] = useState('http://localhost:3005/pdfs/linha_208_planilha_de_campo.pdf');

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const zoomPluginInstance = zoomPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const searchPluginInstance = searchPlugin();

  return (
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
      <Viewer plugins={[defaultLayoutPluginInstance, zoomPluginInstance, pageNavigationPluginInstance, searchPluginInstance]} fileUrl={fileUrl} viewMode={ViewMode.SinglePage} />
    </Worker>
  );
}

export default DocumentBox;
