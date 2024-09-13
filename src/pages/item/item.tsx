import { GridColDef } from '@mui/x-data-grid';
import Table from '../../components/table/index';


export const Item = () => {

  // const items = [
  //   {
  //     id: 0,
  //     name: 'wire',
  //     price: '2200',
  //     weight: '1kg',
  //     dimensions: '12*4',
  //     measuringUnit: 'kg',
  //   }
  // ]

  const headings = [
    { key: 'name', value: 'Name'},
    { key: 'price', value: 'Price'},
    { key: 'weight', value: 'Weight'},
    { key: 'dimensions', value: 'Dimensions' },
    { key: 'measuringUnit', value: 'Measuring Unit'},
  ];
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  
  function createData(
    name: string,
    price: string,
    weight: string,
    dimensions: string,
    measuringUnit: string,
  ) {
    return { name, price, weight, dimensions, measuringUnit };
  }

  return (
    <Table 
      rows={rows}
      headings={headings}
    />
  )
};

export default Item;