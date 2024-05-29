import { createRef, useEffect, useRef, useState } from 'react';
import { tempData } from '../../common/tempData';
import Table from '@mui/joy/Table';

import './AutoSelectBox.css';
import { Grid, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import ManualSelectBox from '../manualSelectBox/ManualSelectBox';
import { useLineStore } from '../../stores/lineStore';
import { useShallow } from 'zustand/react/shallow';

function AutoSelectBox() {
  const backEndAutoData = useLineStore(useShallow((state) => state.autoData));

  const myRef = useRef<HTMLInputElement>(null);

  const [autoData, setAutoData] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>(null);

  useEffect(() => {
    setAutoData(backEndAutoData);
  }, [backEndAutoData]);

  const onClick = (item: any, index: number) => {
    if (!item.isAnomaly) return;
    setSelectedData({ item, index });
  };

  const onSelected = (item: any) => {
    setSelectedData(null);
    if (item === null) return;

    setAutoData((prev) => {
      const newAutoData = [...prev];
      newAutoData[selectedData.index] = item;
      return newAutoData;
    });
  };

  return (
    <div ref={myRef}>
      <Table stickyHeader borderAxis='both'>
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
            <th>M</th>
            <th>N</th>
            <th>SPmV</th>
            <th>mV</th>
            <th>mA</th>
            <th>Ohms</th>
          </tr>
        </thead>
        <tbody>
          {autoData.map((row, index) => (
            <tr key={index} className={row.isAnomaly ? 'isAnomaly' : ''} onClick={() => onClick(row, index)}>
              <td>{parseFloat(row.A)}</td>
              <td>{parseFloat(row.B)}</td>
              <td>{parseFloat(row.M)}</td>
              <td>{parseFloat(row.N)}</td>
              <td>{row.SPmV}</td>
              <td>{row.mV}</td>
              <td>{row.mA}</td>
              <td>{row.Ohms}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal open={selectedData !== null} container={myRef.current}>
        <ModalDialog layout={'fullscreen'} style={{ overflow: 'auto' }}>
          <ManualSelectBox onSelected={(selected) => onSelected(selected)} />
        </ModalDialog>
      </Modal>
    </div>
  );
}

export default AutoSelectBox;
