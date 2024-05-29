import extract from 'extract-zip';
import path from 'path';
import fs from 'fs';
import csvtojson from 'csvtojson';

export const extractAndParse = async (filePath: string) => {
  const __dirname = path.resolve();

  const fullFilePath = path.join(__dirname, filePath);
  const extractPath = path.join(__dirname, 'extracted');

  await extract(fullFilePath, { dir: extractPath });

  fs.unlinkSync(fullFilePath);

  const extractedFile = getOnlyFilePathFromFolder(extractPath);

  const autoJson = await csvtojson().fromFile(getOnlyFilePathFromFolder(path.join(extractedFile, 'Dados_pendrive', 'Automatico')));

  const manualJson = await csvtojson().fromFile(getOnlyFilePathFromFolder(path.join(extractedFile, 'Dados_pendrive', 'Manual')));

  const pdfFileName = copyPDF(extractedFile);

  fs.rmdirSync(extractedFile, { recursive: true });

  return {
    autoJson: sanityzeData(autoJson),
    manualJson: sanityzeData(manualJson),
    pdfFilePath: pdfFileName,
  };
};

const sanityzeData = (data: any) => {
  return data.map((row: any) => {
    return {
      ...row,
      isAnomaly: parseFloat(row['Ohms'] ?? '0') === 0,
    };
  });
};

const copyPDF = (extractedFile: string) => {
  const __dirname = path.resolve();

  const pdfFilePath = getOnlyFilePathFromFolder(path.join(extractedFile, 'Planilha_de_campo'));
  const fileName = `${path.basename(extractedFile)}_${path.basename(pdfFilePath)}`.replaceAll(' ', '_');

  const dirPath = path.join(__dirname, 'public', 'pdfs');

  // Create the directory if it does not exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const newPdfFilePath = path.join(dirPath, fileName);

  fs.copyFileSync(pdfFilePath, newPdfFilePath);
  return fileName;
};

const getOnlyFilePathFromFolder = (folderPath: string) => {
  try {
    return path.join(folderPath, fs.readdirSync(folderPath)[0] ?? '');
  } catch (e) {
    return '';
  }
};
