import { create } from 'zustand';
import server from '../common/server';

type Store = {
  autoData: any[];
  manualData: any[];
  pdfFilePath: string | null;
  getData: (file: any) => void;
  generateFinalFile: () => void;
};

const useLineStore = create<Store>()((set, get) => ({
  autoData: [],
  manualData: [],
  pdfFilePath: null,
  async getData(file: any) {
    const response: any = await server.uploadFile(file);
    const data = await response.json();
    set({ autoData: data.autoJson, manualData: data.manualJson, pdfFilePath: data.pdfFilePath });
  },
  async generateFinalFile() {
    const result = await server.toExcel(get().autoData);
    const blob = await result.blob();
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    var filename = (get().pdfFilePath ?? '').split('/').pop() ?? "";
    let parts = filename.split('.');
    parts.pop();
    filename = parts.join('.');
    a.download = `${filename}.xlsx`;
    document.body.appendChild(a); // append the element to the dom
    a.click();
    a.remove();
    return result;
  },
}));

export { useLineStore };
