const config = [
  {
    name: 'inputTest1',
    text: '测试',
    type: 'input',
    value: '2222',
    disabled: true,
  },
  {
    name: 'inputTest2',
    text: '测试',
    type: 'input',
    value: '',
    disabled: false,
  },
  {
    name: 'selectTest',
    text: '筛选',
    type: 'select',
    value: '',
    options: [{ label: 'test1', value: 'test1' }, { label: 'test2', value: 'test2' }],
    disabled: false
  },
  {
    name: 'selectTest',
    text: '筛选',
    type: 'select',
    value: '',
    options: [{ label: 'test1', value: 'test1' }, { label: 'test2', value: 'test2' }],
    disabled: false
  },
];

export const fakeData = {
  name: [{ label: 'covey', value: 'covey1' }, { label: 'zkr', value: 'zkr' }]
}

export default config


