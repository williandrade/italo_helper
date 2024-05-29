import { ViewMode, Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { searchPlugin } from '@react-pdf-viewer/search';
import { useState, useEffect } from 'react';
import { version } from 'pdfjs-dist';  

import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import { useLineStore } from '../../stores/lineStore';
import { useShallow } from 'zustand/react/shallow';

function DocumentBox() {
  const pdfFilePath = useLineStore(useShallow((state) => state.pdfFilePath));

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const zoomPluginInstance = zoomPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const searchPluginInstance = searchPlugin();

  return (
    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.js`}>
      <Viewer plugins={[defaultLayoutPluginInstance, zoomPluginInstance, pageNavigationPluginInstance, searchPluginInstance]} fileUrl={`//italo.williandrade.me/pdfs/${pdfFilePath}`} viewMode={ViewMode.SinglePage} />
    </Worker>
  );
}

export default DocumentBox;
