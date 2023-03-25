const config = [
  {
    name: 'inputTest1',
    text: '测试',
    type: 'input',
    value: '2222',
    disabled: true,
    col: 1
  },
  {
    name: 'inputTest2',
    text: '测试2',
    type: 'input',
    value: '',
    disabled: false,
    col: 1
  },
  {
    name: 'selectTest1',
    text: '筛选',
    type: 'select',
    value: '',
    options: [{ label: 'test1', value: 'test1' }, { label: 'test2', value: 'test2' }],
    disabled: false,
    col: 1
  },
  {
    name: 'selectTest2',
    text: '筛选',
    type: 'select',
    value: '',
    options: [{ label: 'test1', value: 'test1' }, { label: 'test2', value: 'test2' }],
    disabled: false,
    col: 1
  },
  {
    name: 'selectTest3',
    text: '筛选3',
    type: 'select',
    value: '',
    options: [{ label: 'test1', value: 'test1' }, { label: 'test2', value: 'test2' }],
    disabled: false,
    col: 2
  },
  {
    name: 'inputTest3',
    text: '测试3',
    type: 'input',
    value: '',
    disabled: false,
    col: 2
  },
  {
    name: 'selectMul1',
    text: '多选',
    type: 'mulSelect',
    value: [],
    disabled: false,
    options: [
      { label: 'selectMulTest1', value: 'selectMulTest1-value' },
      { label: 'selectMulTest2', value: 'selectMulTest2-value' },
      { label: 'selectMulTest3', value: 'selectMulTest3-value' }
    ],
    // targetName: '',
    col: 2
  }
];

export const fakeData = {
  name: [{ label: 'covey', value: 'covey1' }, { label: 'zkr', value: 'zkr' }]
}

export default config


