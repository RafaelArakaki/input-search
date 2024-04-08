import { Input, Table } from "antd";
import type { ColumnsType } from 'antd/es/table';

import styles from './styles.module.css';

import MOCK_LIST_PEOPLE from './mocks/list_people.json';
import { useState } from "react";

type TableProps = {
  name: string,
  age: number,
  height: string,
  weight: number,
}

function App() {
  const [inputSearch, setInputSearch] = useState<string>('');

  const columns: ColumnsType<TableProps> = [
    {
      title: 'NOME',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      showSorterTooltip: false,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    },
    {
      title: 'IDADE',
      dataIndex: 'age',
      key: 'age',
      width: '25%',
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => a.age - b.age,
      },
      render: (_, { age }) => `${age} anos`,
    },
    {
      title: 'ALTURA',
      dataIndex: 'height',
      key: 'height',
      width: '25%',
      showSorterTooltip: false,
      sorter: (a, b) => a.height.toLowerCase().localeCompare(b.height.toLowerCase()),
      render: (_, { height }) => `${height} m`,
    },
    {
      title: 'PESO',
      dataIndex: 'weight',
      key: 'weight',
      width: '25%',
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => a.weight - b.weight,
      },
      render: (_, { weight }) => `${weight} kg`,
    },
  ];

  const isPropertyMatching = <K extends string, T extends { [key in K]: string | number }>(
    key: K, string: string | number, item: T,
  ) => (item[key]?.toString().toLowerCase().includes(string.toString().toLowerCase()));

  const filters = [
    (item: TableProps) => isPropertyMatching('name', inputSearch, item),
    (item: TableProps) => isPropertyMatching('age', inputSearch, item),
    (item: TableProps) => isPropertyMatching('height', inputSearch, item),
    (item: TableProps) => isPropertyMatching('weight', inputSearch, item),
  ];

  const filterByInputSearch = (list: Array<TableProps>) => list
    .filter((item: TableProps) => filters.some((element) => element(item)));
  
  let FILTERED_DATA: Array<TableProps> = [];

  FILTERED_DATA = filterByInputSearch(MOCK_LIST_PEOPLE);

  return (
    <div className={styles.container}>
      <Input
        className={styles.input_form}
        placeholder="Pesquisar"          
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
      />     
      <Table
        className={styles.table}
        columns={columns}
        dataSource={FILTERED_DATA}
        size="middle"
        pagination={{
          position: ['bottomCenter'],
          total: FILTERED_DATA.length,
          showTotal: (total) => `Total: ${total}`
        }}
        
        rowKey="name"
      />
    </div>
  )
}

export default App
