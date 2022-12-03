import mockData from './mockData'

export const expenseMock = {
  value: '10',
  description: 'lanche',
  currency: 'EUR',
  method: 'dinheiro',
  tag: 'alimentação'
}

export const expensesMock = [
  {
    id: 0,
    value: '10',
    currency: 'EUR',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: 'lanche',
    exchangeRates: {...mockData}
  },
  {
    id: 1,
    value: '500',
    currency: 'USD',
    method: 'Cartão de Débito',
    tag: 'Saúde',
    description: 'Plano de saúde',
    exchangeRates: {...mockData}
  }
]