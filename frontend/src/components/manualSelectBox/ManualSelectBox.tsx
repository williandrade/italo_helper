import { Button, Sheet, Stack, Table, styled } from '@mui/joy';
import { useEffect, useState } from 'react';
import { tempData } from '../../common/tempData';
import _ from 'lodash';
import { on } from 'events';
import { useLineStore } from '../../stores/lineStore';
import { useShallow } from 'zustand/react/shallow';

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography['body-sm'],
  textAlign: 'center',
  fontWeight: theme.fontWeight.md,
  color: theme.vars.palette.text.secondary,
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: theme.spacing(5),
  borderRadius: theme.radius.md,
  ':hover': {
    backgroundColor: theme.palette.background.level2,
    cursor: 'pointer',
  },
}));

function ManualSelectBox({ onSelected }: { onSelected: (selected: any) => void }) {
  const backEndmanualData = useLineStore(useShallow((state) => state.manualData));

  const [manualData, setManualData] = useState<any>({});
  const [selectedData, setSelectedData] = useState<any[]>([]);

  useEffect(() => {
    setManualData(_.groupBy(tempData.manualJson, 'Measure'));
  }, [backEndmanualData]);

  const onGroupClick = (item: any[]) => {
    setSelectedData(item);
  };

  const onClick = (item: any) => {
    onSelected(item);
    setSelectedData([]);
  };

  return (
    <>
      {selectedData.length > 0 ? (
        <>
          <Button onClick={() => setSelectedData([])}>Back</Button>
          <Table stickyHeader borderAxis='both' hoverRow>
            <thead>
              <tr>
                <th>Measure</th>
                <th>SPmV</th>
                <th>mV</th>
                <th>mA</th>
                <th>Ohms</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map((row, index) => (
                <tr key={index} className={row.isAnomaly ? 'isAnomaly' : ''} onClick={() => onClick(row)}>
                  <td>{row.Measure}</td>
                  <td>{row.SPmV}</td>
                  <td>{row.mV}</td>
                  <td>{row.mA}</td>
                  <td>{row.Ohms}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <>
          <Button onClick={() => onSelected(null)}>Back</Button>
          <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={2} flexWrap='wrap' useFlexGap>
            {Object.keys(manualData).map((key: string, index: number) => (
              <Item key={index} onClick={() => onGroupClick(manualData[key])}>
                {parseFloat(key)}
              </Item>
            ))}
          </Stack>
        </>
      )}
    </>
  );
}

export default ManualSelectBox;
