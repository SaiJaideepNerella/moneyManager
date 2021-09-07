import {Component} from 'react'
import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      eachTransaction => id !== eachTransaction.id,
    )
    this.setState({
      transactionList: updatedTransactionList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionID = event => {
    this.setState({optionId: event.target.value})
  }

  calculateBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  calculateIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  calculateExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  render() {
    const {transactionList, titleInput, amountInput, optionId} = this.state

    const balanceAmount = this.calculateBalance()
    const incomeAmount = this.calculateIncome()
    const expensesAmount = this.calculateExpenses()
    return (
      <div className="money-Manager-container">
        <div className="bg-container">
          <h1 className="name">Hi, Richard</h1>
          <p className="welcome-section">
            Welcome Back to your <span className="span">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div className="add-transaction-history-container">
          <div className="add-transaction-container">
            <form className="form" onSubmit={this.onAddTransaction}>
              <h1 className="Heading">Add Transaction</h1>
              <div className="input-container">
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  className="Input-value"
                  id="title"
                  type="text"
                  placeholder="TITLE"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                />
              </div>
              <div className="input-container">
                <label htmlFor="Amount" className="label">
                  AMOUNT
                </label>
                <input
                  className="Input-value"
                  id="Amount"
                  type="text"
                  placeholder="AMOUNT"
                  value={amountInput}
                  onChange={this.onChangeAmountInput}
                />
              </div>
              <div className="input-container">
                <label htmlFor="select" className="label">
                  TYPE
                </label>
                <select
                  id="select"
                  className="Input-value"
                  value={optionId}
                  onChange={this.onChangeOptionID}
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option key={eachOption.id} value={eachOption.optionId}>
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="history-transactions">
            <h1 className="transaction-header">History</h1>
            <div className="transactions-table-container">
              <ul className="transactions-table">
                <li className="table-header">
                  <p className="table-header-cell">Title</p>
                  <p className="table-header-cell">Amount</p>
                  <p className="table-header-cell">Type</p>
                </li>
                {transactionList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
